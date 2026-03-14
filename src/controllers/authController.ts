import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";

const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        //check if user already exists
        const userExists = await prisma.user.findUnique({
            where: {
                email: email
            },
        });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //validate input
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        //create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
        //generate token
        const token = generateToken(user.id, res);

        res.status(201).json({
            status: "success",
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt
                },
                token: token,
            }
        });
    } catch (error) {
        console.error("Error creating user", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    //check if user exists
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    if (!user) {
        return res.status(401).json({
            message: "Invali email or password"
        });
    }
    //verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }
    //generate token
    const token = generateToken(user.id, res);

    res.status(201).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                email: user.email,
            },
            token: token,
        }
    });
}

//logout
const logout = async (req: Request, res: Response) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({
        status: "success",
        message: "Logged out successfully"
    });
}

export { register, login, logout };