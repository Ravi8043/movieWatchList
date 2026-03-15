import { prisma } from "../lib/prisma";
import { AuthRequest } from "../types/express";
import { Response } from "express";

const addMovie = async (req: AuthRequest, res: Response) => {
    try {
        const { title, year, rating, overview } = req.body;
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        const userId = req.user.id;
        //check if movie already exists
        const movie = await prisma.movie.findFirst({
            where: {
                userId: userId,
                title: title,
                year: year
            }
        });
        if (movie) {
            return res.status(400).json({
                message: "movie already exists"
            })
        }
        //add movie to movie table
        const newMovie = await prisma.movie.create({
            data: {
                title: title,
                year: year,
                rating: rating,
                overview: overview,
                userId: userId
            }
        });
        return res.status(201).json(newMovie);
    } catch (error) {
        console.error("Error adding movie:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const removeMovie = async (req: AuthRequest, res: Response) => {
    try {
        const movieId = Number(req.params.id);
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        const userId = req.user.id;
        //check if movie exists
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
        //check if movie belongs to user
        if (movie.userId !== userId) {
            return res.status(403).json({
                message: "Forbidden"
            });
        }
        //remove movie
        const deletedMovie = await prisma.movie.delete({
            where: {
                id: movieId
            }
        });
        return res.status(200).json({ message: "Movie removed successfully", deletedMovie });
    } catch (error) {
        console.error("Error removing movie:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
//get a movie item
const getMovieItem = async (req: AuthRequest, res: Response) => {
    try {
        const movieId = Number(req.params.id);
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        const userId = req.user.id;
        //check if movie exists
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
        //check if movie belongs to user
        if (movie.userId !== userId) {
            return res.status(403).json({
                message: "Forbidden"
            });
        }
        return res.status(200).json(movie);
    } catch (error) {
        console.error("Error getting movie:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//update a movie item
const updateMovieItem = async (req: AuthRequest, res: Response) => {
    try {
        const movieId = Number(req.params.id);
        const { title, year, rating, overview } = req.body;
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        const userId = req.user.id;
        //check if movie exists
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
        //check if movie belongs to user
        if (movie.userId !== userId) {
            return res.status(403).json({
                message: "Forbidden"
            });
        }
        //update movie
        const updatedMovie = await prisma.movie.update({
            where: {
                id: movieId
            },
            data: {
                title: title,
                year: year,
                rating: rating,
                overview: overview
            }
        });
        return res.status(200).json(updatedMovie);
    } catch (error) {
        console.error("Error updating movie:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//get all movie items
const getAllMovies = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        const userId = req.user.id;
        //get all movies
        const movies = await prisma.movie.findMany({
            where: {
                userId: userId
            }
        });
        return res.status(200).json(movies);
    } catch (error) {
        console.error("Error getting movies:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export { addMovie, removeMovie, getMovieItem, updateMovieItem, getAllMovies };