import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter, log: process.env.NODE_ENV === "development" ? ["query", "info", "warn", "error"] : ["error"] });

//connect to db
async function connectToDb() {
    try {
        await prisma.$connect();
        console.log("Connected to database");
    } catch (error) {
        console.error("Error connecting to database", error);
    }
}
//disconnect to db
async function disconnectToDb() {
    try {
        await prisma.$disconnect();
        console.log("Disconnected from database");
    } catch (error) {
        console.error("Error disconnecting from database", error);
    }
}
export { prisma, connectToDb, disconnectToDb };