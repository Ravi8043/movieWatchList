import express from "express";
import { addToWatchList, removeFromWatchList, getWatchList, getWatchListItem, updateWatchListItem } from "../controllers/watchListController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateRequest } from "../middlewares/validateRequest";
import { addToWatchListSchema, getWatchListSchema, removeFromWatchListSchema, updateWatchListSchema } from "../validators/watchlistValidators";

const router = express.Router();

//apply auth middleware to all routes
router.use(authMiddleware);

//if you want to add middleware to a specific route, you can do it like this:
//router.post("/add", authMiddleware, addToWatchList);

router.post("/add", validateRequest(addToWatchListSchema), addToWatchList);
router.delete("/delete/:id", validateRequest(removeFromWatchListSchema), removeFromWatchList);
router.get("/", getWatchList);
router.get("/:id", validateRequest(getWatchListSchema), getWatchListItem);
router.put("/update/:id", validateRequest(updateWatchListSchema), updateWatchListItem);

export default router;