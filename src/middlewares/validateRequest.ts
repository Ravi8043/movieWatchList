import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export const validateRequest = (schema: z.ZodTypeAny) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });

            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errors = error.issues.map((err) => ({
                    field: err.path.join("."),
                    message: err.message,
                }));

                return res.status(400).json({
                    message: "Validation failed",
                    errors,
                });
            }

            next(error);
        }
    };
};