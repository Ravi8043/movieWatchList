import { z } from "zod";

export const addToWatchListSchema = z.object({
    body: z.object({
        movieId: z.number(),
        status: z.enum(["PLANNED", "WATCHED", "NOT_INTERESTED"], {
            error: () => ({
                message: "status must be one of: PLANNED, WATCHED, NOT_INTERESTED"
            }),
        }).optional(),
        notes: z.string().optional(),
    }),
});

export const removeFromWatchListSchema = z.object({
    params: z.object({
        id: z.coerce.number(),
    }),
});

export const updateWatchListSchema = z.object({
    params: z.object({
        id: z.coerce.number(),
    }),
    body: z.object({
        status: z.enum(["PLANNED", "WATCHED", "NOT_INTERESTED"], {
            error: () => ({
                message: "status must be one of: PLANNED, WATCHED, NOT_INTERESTED"
            }),
        }).optional(),
        notes: z.string().optional(),
    }),
});

export const getWatchListSchema = z.object({
    params: z.object({
        id: z.coerce.number(),
    }),
});
