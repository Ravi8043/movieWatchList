import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

const addToWatchList = async (req: Request, res: Response) => {
    const { movieId, status, notes } = req.body;
    //verify if movie exists
    const movie = await prisma.movie.findUnique({
        where: {
            id: movieId
        }
    });
    if (!movie) {
        return res.status(404).json({
            message: "Movie not found"
        });
    }
}

export { addToWatchList };