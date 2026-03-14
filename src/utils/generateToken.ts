import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Response } from "express";
dotenv.config();

export const generateToken = (id: number, res: Response) => {
    const payload = { id: id };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: "1d"
    });
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return token;
};
