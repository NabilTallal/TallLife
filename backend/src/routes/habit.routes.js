import express from "express";
import {
    addHabit,
    getHabits,
    getHabitsByDate,
    updateHabit,
    deleteHabit,
    getHabitAnalytics, getHabitLeaderboard
} from "../controllers/habit.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protectRoute);

router.post("/", addHabit);
router.get("/", getHabits);
router.post("/by-date", getHabitsByDate);
router.put("/:id", updateHabit);
router.delete("/:id", deleteHabit);
router.get("/analytics", getHabitAnalytics);
router.get("/analytics/leaderboard", protectRoute, getHabitLeaderboard);

export default router;