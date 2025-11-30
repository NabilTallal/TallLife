import express from "express";
import {
    addSleep,
    getSleep,
    getSleepByDate,
    updateSleep,
    deleteSleep,
    getSleepAnalytics
} from "../controllers/sleep.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protectRoute);

// Analytics route first (most specific)
router.get("/analytics", getSleepAnalytics);

// Date-based query route
router.get("/by-date", getSleepByDate); // Changed from POST to GET

// CRUD operations with ID
router.post("/", addSleep);
router.get("/", getSleep);
router.put("/:id", updateSleep);
router.delete("/:id", deleteSleep);

export default router;