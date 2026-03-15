import express from "express";
import cookieParser from "cookie-parser";
import basic from "./routes/basic";
import movieRoutes from "./routes/movieRoutes";
import authRoutes from "./routes/authRoutes";
import watchListRoutes from "./routes/watchListRoutes";


const app = express();
app.use(express.json()); //to parse the incoming requests with JSON payloads converts raw json to js object
app.use(cookieParser()); //to parse the incoming cookies otherwise it will not be able to read the cookies shows undefined
//just like above json obj if we dont use that middleware we will not be able to read the json

app.use("/basic", basic);
app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);
app.use("/watchlist", watchListRoutes);


export default app;