import app from "./app";
import { connectToDb, disconnectToDb } from "./lib/prisma";

const PORT = 5000;

async function startServer() {
    try {
        await connectToDb();

        const server = app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

        //handle unhandled promise rejections
        process.on("unhandledRejection", (error) => {
            console.error("Unhandled Rejection:", error);
            server.close(async () => {
                await disconnectToDb();
                process.exit(1);
            });
        });

        //handle uncaught exceptions
        process.on("uncaughtException", async (error) => {
            console.error("Uncaught Exception:", error);
            await disconnectToDb();
            process.exit(1);
        });

        //graceful shutdown
        process.on("SIGTERM", async () => {
            console.log("SIGTERM received. Shutting down...");
            server.close(async () => {
                await disconnectToDb();
                process.exit(0);
            });
        });

    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

startServer();
