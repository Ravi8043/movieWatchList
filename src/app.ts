import express from "express";
import basic from "./routes/basic";
import movieRoutes from "./routes/movieRoutes";
import authRoutes from "./routes/authRoutes";


const app = express();
app.use(express.json()); //to parse the incoming requests with JSON payloads converts raw json to js object

app.use("/basic", basic);
app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);



export default app;