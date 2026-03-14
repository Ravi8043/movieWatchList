import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { NextFunction, Request, Response } from "express";

//read the token from the request
//check if token is valid or not

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.jwt || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized - No token provided"
            });
        }

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

        (req as any).user = user;
        next();
    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(401).json({
            message: "Unauthorized - Invalid token"
        });
    }
};