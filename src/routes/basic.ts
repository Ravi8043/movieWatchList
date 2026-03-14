import { Request, Response } from "express";
import express from "express";

const router = express.Router();
const arr: string[] = [];
router.get("/", (req: Request, res: Response) => {
    res.json({
        message: "hello world"
    });
});

//post req just to know more about it
router.post("/post", (req: Request, res: Response) => {
    const { name } = req.body;
    const { age } = req.body;
    arr.push(name);
    arr.push(age);
    res.json({
        response: "request successful",
        arr
    });
});
export default router;