import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/express";

//read the token from the request
//check if token is valid or not

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        //check if token is present in the request we check it from cookies or from headers
        const token = req.cookies?.jwt || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized - No token provided"
            });
        }
        //if tokes is valid then decode the payload and treat it as an obj containing a user id.
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: { id: true, email: true, name: true }
        });

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized - User not found"
            });
        }
        //attach the user object to the request so that it can be used in the controller
        req.user = user;
        next();
    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(401).json({
            message: "Unauthorized - Invalid token"
        });
    }
};