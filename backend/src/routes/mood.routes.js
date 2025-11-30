import express from "express";
import {
    addMood,
    getMoods,
    getMoodByDate,
    updateMood,
    deleteMood,
    getMoodAnalytics
} from "../controllers/mood.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protectRoute); // all routes protected

router.post("/", addMood); // add a mood
router.get("/", getMoods); // get all moods of logged-in user
router.post("/by-date", getMoodByDate); // get moods for a specific date
router.put("/:id", updateMood); // update a mood
router.delete("/:id", deleteMood); // delete a mood
router.get("/analytics", getMoodAnalytics);

export default router;