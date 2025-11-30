import Habit from "../models/habit.model.js";

export const addHabit = async (req, res) => {
    try {
        const { habit, note, tags, startTime, endTime } = req.body;
        const loggedInUser = req.user._id;

        if (!habit || !startTime || !endTime) {
            return res.status(400).json({ message: "Please fill in the required fields." });
        }

        if (typeof habit !== "string") {
            return res.status(400).json({ message: "The habit should be presented by characters." });
        }

        const newHabit = new Habit({
            userId: loggedInUser,
            habit,
            note,
            tags,
            startTime,
            endTime,
            duration: (new Date(endTime) - new Date(startTime)) / 60000 // duration in minutes
        });

        await newHabit.save();

        res.status(201).json(newHabit);
    } catch (e) {
        console.error("Error in addHabit controller:", e);
        res.status(500).json({ message: "Internal server error." });
    }
};

export const getHabits = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        const habits = await Habit.find({ userId: loggedInUser }).sort({ date: -1 });

        res.status(200).json(habits);
    } catch (e) {
        console.error("Error in getHabits controller:", e);
        res.status(500).json({ message: "Internal server error." });
    }
};

export const getHabitsByDate = async (req, res) => {
    try {
        const { date } = req.body;
        const loggedInUser = req.user._id;

        if (!date) {
            return res.status(400).json({ message: "Date is required." });
        }

        const start = new Date(date);
        start.setHours(0, 0, 0, 0);

        const end = new Date(date);
        end.setHours(23, 59, 59, 999);

        const habits = await Habit.find({
            userId: loggedInUser,
            date: { $gte: start, $lte: end }
        });

        if (!habits.length) {
            return res.status(404).json({ message: "No habits found for this date." });
        }

        res.status(200).json(habits);
    } catch (e) {
        console.error("Error in getHabitsByDate controller:", e);
        res.status(500).json({ message: "Internal server error." });
    }
};

export const deleteHabit = async (req, res) => {
    try {
        const habitId = req.params.id;
        const userId = req.user._id;

        const habit = await Habit.findOne({ _id: habitId, userId });

        if (!habit) {
            return res.status(404).json({ message: "No habit was found." });
        }

        await Habit.findByIdAndDelete(habitId);

        res.status(200).json({ message: "The habit was deleted successfully." });
    } catch (e) {
        console.error("Error in deleteHabit controller:", e);
        res.status(500).json({ message: "Internal server error." });
    }
};

export const updateHabit = async (req, res) => {
    try {
        const habitId = req.params.id;
        const { habit, tags, note, startTime, endTime } = req.body;
        const userId = req.user._id;

        const oldHabit = await Habit.findOne({ _id: habitId, userId });
        if (!oldHabit) {
            return res.status(404).json({ message: "No habit was found." });
        }

        if (habit !== undefined && typeof habit !== "string") {
            return res.status(400).json({ message: "Habit should be a string." });
        }

        const updateData = {};
        if (habit !== undefined) updateData.habit = habit;
        if (tags !== undefined) updateData.tags = tags;
        if (note !== undefined) updateData.note = note;
        if (startTime !== undefined) updateData.startTime = startTime;
        if (endTime !== undefined) updateData.endTime = endTime;
        if (startTime !== undefined && endTime !== undefined) {
            updateData.duration = (new Date(endTime) - new Date(startTime)) / 60000;
        }

        const updatedHabit = await Habit.findByIdAndUpdate(habitId, updateData, { new: true });

        res.status(200).json(updatedHabit);
    } catch (e) {
        console.error("Error in updateHabit controller:", e);
        res.status(500).json({ message: "Internal server error." });
    }
}

export const getHabitAnalytics = async (req, res) => {
    try {
        const userId = req.user._id;

        const analytics = await Habit.aggregate([
            { $match: { userId } },
            {
                $group: {
                    _id: null,
                    totalHabits: { $sum: 1 },
                    totalDuration: { $sum: "$duration" },
                    avgDuration: { $avg: "$duration" },
                    earliestStart: { $min: "$startTime" },
                    latestEnd: { $max: "$endTime" }
                }
            }
        ]);

        if (!analytics.length) return res.json({
            totalHabits: 0,
            totalDuration: 0,
            avgDuration: 0,
            earliestStart: null,
            latestEnd: null
        });

        res.json(analytics[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch habit analytics" });
    }
}

export const getHabitLeaderboard = async (req, res) => {
    try {
        const userId = req.user._id;

        const leaderboard = await Habit.aggregate([
            { $match: { userId } },
            {
                $group: {
                    _id: "$habit",
                    totalTime: { $sum: "$duration" },
                    entries: { $sum: 1 },
                    avgDuration: { $avg: "$duration" }
                }
            },
            { $sort: { totalTime: -1 } } // sort by time spent
        ]);

        res.json({ leaderboard });
    } catch (error) {
        console.error("Habit Leaderboard Error:", error);
        res.status(500).json({ message: "Failed to compute leaderboard" });
    }
};;

