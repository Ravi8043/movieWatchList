import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

const addToWatchList = async (req: Request, res: Response) => {
    try {
        const { movieId, status, notes } = req.body;
        const userId = (req as any).user.id;

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
        //check if movie already added into watchlist
        const watchlist = await prisma.watchlist.findUnique({
            where: {
                userId_movieId: {
                    userId: userId,
                    movieId: movieId
                }
            }
        });
        if (watchlist) {
            return res.status(400).json({
                message: "Movie already added to watchlist"
            });
        }
        //add movie to watchlist
        const newWatchlist = await prisma.watchlist.create({
            data: {
                userId: userId,
                movieId: movieId,
                status: status,
                notes: notes
            }
        });
        return res.status(201).json(newWatchlist);
    } catch (error) {
        console.error("Error adding to watchlist:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const removeFromWatchList = async (req: Request, res: Response) => {
    try {
        const { movieId } = req.body;
        const userId = (req as any).user.id;

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
        //check if movie already added into watchlist
        const watchlist = await prisma.watchlist.findUnique({
            where: {
                userId_movieId: {
                    userId: userId,
                    movieId: movieId
                }
            }
        });
        if (!watchlist) {
            return res.status(400).json({
                message: "Movie not found in watchlist"
            });
        }
        //remove movie from watchlist
        const deletedWatchlist = await prisma.watchlist.delete({
            where: {
                userId_movieId: {
                    userId: userId,
                    movieId: movieId
                }
            }
        });
        return res.status(200).json({ message: "Removed from watchlist", deletedWatchlist });
    } catch (error) {
        console.error("Error removing from watchlist:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export { addToWatchList, removeFromWatchList };