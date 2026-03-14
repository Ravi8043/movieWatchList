import express from "express";
import { addToWatchList, removeFromWatchList } from "../controllers/watchListController";
import { authMiddleware } from "../middlewares/authMiddleware";


const router = express.Router();

//apply auth middleware to all routes
router.use(authMiddleware);

//if you want to add middleware to a specific route, you can do it like this:
//router.post("/add", authMiddleware, addToWatchList);
router.post("/add", addToWatchList);
router.post("/remove", removeFromWatchList);

export default router;