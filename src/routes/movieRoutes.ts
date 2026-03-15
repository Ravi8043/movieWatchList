import express from "express";
import { addMovie, removeMovie, getMovieItem, updateMovieItem, getAllMovies } from "../controllers/movieController";
import { authMiddleware } from "../middlewares/authMiddleware";

// connectToDb is handled in server.ts

const router = express.Router();

router.use(authMiddleware);
router.post("/add", addMovie);
router.delete("/remove", removeMovie); //instead of post use delete request type
router.get("/:id", getMovieItem);
router.put("/update/:id", updateMovieItem);
router.get("/", getAllMovies);
export default router;