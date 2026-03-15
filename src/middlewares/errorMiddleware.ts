import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/express";
import { Prisma } from "../generated/prisma/client";

interface CustomError extends Error {
    statusCode?: number;
    status?: string;
}

/**
 * 404 Not Found handler
 * Creates an error for routes that don't exist
 */
const notFound = (req: AuthRequest, res: Response, next: NextFunction) => {
    const error = new Error(`Route ${req.originalUrl} not found`) as CustomError;
    error.statusCode = 404;
    next(error);
};

/**
 * Global error handler middleware
 * Handles all errors in the application and sends appropriate responses
 * Provides detailed error information in development, minimal info in production
 */
const errorHandler = (err: any, req: AuthRequest, res: Response, next: NextFunction) => {
    let error = { ...err, message: err.message, name: err.name, stack: err.stack } as CustomError;
    error.statusCode = err.statusCode || 500;
    error.status = err.status || "error";

    // Handle Prisma validation errors
    if (err instanceof Prisma.PrismaClientValidationError) {
        error.statusCode = 400;
        error.message = "Invalid data provided";
    }

    // Handle Prisma unique constraint violations
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            const field = err.meta?.target ? (err.meta.target as string[])[0] : "field";
            error.statusCode = 400;
            error.message = `${field} already exists`;
        }
        // Handle record not found
        if (err.code === "P2025") {
            error.statusCode = 404;
            error.message = "Record not found";
        }
        // Handle Prisma foreign key constraint violations
        if (err.code === "P2003") {
            error.statusCode = 400;
            error.message = "Invalid reference: related record does not exist";
        }
    }

    // Send error response
    res.status(error.statusCode || 500).json({
        status: error.status,
        message: error.message,
        // Only include stack trace in development
        ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    });
};

export { notFound, errorHandler };