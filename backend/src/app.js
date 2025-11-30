import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { ENV } from "./utils/env.js";
import { connectDB } from "./utils/db.js";

import authRoutes from "./routes/auth.routes.js";
import moodRoutes from "./routes/mood.routes.js";
import habitRoutes from "./routes/habit.routes.js";
import sleepRoutes from "./routes/sleep.routes.js";
import path from "path";

const __dirname = path.resolve();
const app = express();

// Middleware
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/moods", moodRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/sleep", sleepRoutes);

// Prod setup
if (ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

// Connect to DB and start server
connectDB().then(() => {
    app.listen(ENV.PORT, () => console.log(`Server running on port ${ENV.PORT}`));
});