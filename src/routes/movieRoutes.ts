import express from "express";
import { addMovie, removeMovie, getMovieItem, updateMovieItem, getAllMovies } from "../controllers/movieController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateRequest } from "../middlewares/validateRequest";
import { addMovieSchema, getMovieSchema, removeMovieSchema, updateMovieSchema } from "../validators/movieValidators";

// connectToDb is handled in server.ts

const router = express.Router();

router.use(authMiddleware);
router.post("/add", validateRequest(addMovieSchema), addMovie);
router.delete("/remove/:id", validateRequest(removeMovieSchema), removeMovie); //instead of post use delete request type
router.get("/:id", validateRequest(getMovieSchema), getMovieItem);
router.put("/update/:id", validateRequest(updateMovieSchema), updateMovieItem);
router.get("/", getAllMovies);

export default router;