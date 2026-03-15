import { Response } from "express";
import { prisma } from "../lib/prisma";
import { AuthRequest } from "../types/express";

const addToWatchList = async (req: AuthRequest, res: Response) => {
    try {
        const { movieId, status, notes } = req.body;

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const userId = req.user.id;

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

const removeFromWatchList = async (req: AuthRequest, res: Response) => {
    try {
        const movieId = Number(req.params.id);

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const userId = req.user.id;

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

const getWatchList = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        const userId = req.user.id;
        const watchlist = await prisma.watchlist.findMany({
            where: {
                userId: userId
            },
            include: {
                movie: true
            }
        })
        return res.status(200).json(watchlist);
    } catch (error) {
        console.error("Error getting watchlist:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//get a watchlist item
const getWatchListItem = async (req: AuthRequest, res: Response) => {
    try {
        const watchListId = Number(req.params.id);
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        const userId = req.user.id;
        const watchlist = await prisma.watchlist.findUnique({
            where: {
                id: watchListId
            },
            include: {
                movie: true
            }
        })
        if (!watchlist) {
            return res.status(404).json({
                message: "Watchlist item not found"
            })
        }
        if (watchlist.userId !== userId) {
            return res.status(403).json({
                message: "Forbidden"
            })
        }
        return res.status(200).json(watchlist);
    } catch (error) {
        console.error("Error getting watchlist item:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
//update a watchlist item
const updateWatchListItem = async (req: AuthRequest, res: Response) => {
    try {
        const watchListId = Number(req.params.id);
        const { status, notes } = req.body;
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        const userId = req.user.id;
        const watchList = await prisma.watchlist.findUnique({
            where: {
                id: watchListId
            }
        });
        if (!watchList) {
            return res.status(404).json({
                message: "Watchlist item not found"
            })
        }
        if (watchList.userId !== userId) {
            return res.status(403).json({
                message: "Forbidden"
            })
        }
        const updatedWatchList = await prisma.watchlist.update({
            where: {
                id: watchListId
            },
            data: {
                status: status,
                notes: notes
            }
        });
        return res.status(200).json(updatedWatchList);
    } catch (error) {
        console.error("Error updating watchlist item:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export { addToWatchList, removeFromWatchList, getWatchList, getWatchListItem, updateWatchListItem };