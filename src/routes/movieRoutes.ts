import express from "express";
import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { connectToDb, disconnectToDb } from "../lib/prisma";


// connectToDb is handled in server.ts

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.json({
        message: "hello world"
    });
});

export default router;