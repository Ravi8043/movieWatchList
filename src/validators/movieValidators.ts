import { z } from "zod";

export const addMovieSchema = z.object({
    body: z.object({
        title: z.string().trim().min(1, "Movie title is required"),
        year: z.coerce
            .number()
            .int("Release year must be an integer")
            .min(1888, "Release year must be a valid year")
            .max(new Date().getFullYear() + 10, "Release year must be a valid year"),
        overview: z.string().trim().optional(),
        rating: z.number().min(0, "Rating must be a number").max(10, "Rating must be a number"),
    }),
});

export const updateMovieSchema = z.object({
    params: z.object({
        id: z.coerce.number(),
    }),
    body: z.object({
        title: z.string().trim().optional(),
        year: z.coerce
            .number()
            .int("Release year must be an integer")
            .min(1888, "Release year must be a valid year")
            .max(new Date().getFullYear() + 10, "Release year must be a valid year")
            .optional(),
        overview: z.string().trim().optional(),
        rating: z.number().min(0, "Rating must be a number").max(10, "Rating must be a number").optional(),
    }),
});

export const removeMovieSchema = z.object({
    params: z.object({
        id: z.coerce.number(),
    }),
});

export const getMovieSchema = z.object({
    params: z.object({
        id: z.coerce.number(),
    }),
});
