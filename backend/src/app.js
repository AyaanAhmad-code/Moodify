import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import songRoutes from "./routes/song.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "https://moodify-bice-psi.vercel.app",
    credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);

export default app;