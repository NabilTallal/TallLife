import Mood from "../models/mood.model.js";

const ISE = "Internal Server Error";

export const addMood = async (req, res) => {
    try {
        const {mood, tags = [], note = ""} = req.body;
        const userId = req.user._id;

        if (!mood) {
            return res.status(400).json({message: "Mood is required."});
        }

        if (typeof mood !== "number" || mood < 1 || mood > 10) {
            return res.status(400).json({message: "Mood must be a number between 1 and 10."});
        }

        const newMood = new Mood({
            userId,
            mood,
            tags,
            note
        });

        await newMood.save();

        res.status(201).json(newMood);
    } catch (e) {
        console.error("Error in addMood controller:", e);
        res.status(500).json({message: "Internal server error."});
    }
};

export const getMoods = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        // Find all moods for this user, sorted by date descending
        const moods = await Mood.find({userId: loggedInUser}).sort({date: -1});

        res.status(200).json(moods);
    } catch (e) {
        console.error("Error in getMoods controller:", e);
        res.status(500).json({message: "Internal server error."});
    }
};

export const getMoodByDate = async (req, res) => {
    try {
        const {date} = req.body;
        const loggedInUser = req.user._id;

        if (!date) {
            return res.status(400).json({message: "Date is required."});
        }

        const start = new Date(date);
        start.setHours(0, 0, 0, 0);

        const end = new Date(date);
        end.setHours(23, 59, 59, 999);

        const mood = await Mood.findOne({
            userId: loggedInUser,
            date: {$gte: start, $lte: end}
        });

        if (!mood) {
            return res.status(404).json({message: "No mood found for this date."});
        }

        res.status(200).json(mood);
    } catch (e) {
        console.error("Error in getMoodByDate controller:", e);
        res.status(500).json({message: "Internal server error."});
    }
};

export const deleteMood = async (req, res) => {
    try {
        const moodId = req.params.id;
        const userId = req.user._id;

        // Find the mood and ensure it belongs to the logged-in user
        const mood = await Mood.findOne({ _id: moodId, userId });

        if (!mood) {
            return res.status(404).json({ message: "No mood was found." });
        }

        await Mood.findByIdAndDelete(moodId);

        res.status(200).json({ message: "The mood was deleted successfully." });
    } catch (e) {
        console.error("Error in deleteMood controller:", e);
        res.status(500).json({ message: "Internal server error." });
    }
};

export const updateMood = async (req, res) => {
    try {
        const moodId = req.params.id;
        const { mood, tags, note } = req.body;
        const userId = req.user._id;

        const oldMood = await Mood.findOne({ _id: moodId, userId });
        if (!oldMood) {
            return res.status(404).json({ message: "No mood was found." });
        }

        // Validate mood
        if (mood !== undefined && (typeof mood !== "number" || mood < 1 || mood > 10)) {
            return res.status(400).json({ message: "Mood must be a number between 1 and 10." });
        }

        const updateData = {};
        if (mood !== undefined) updateData.mood = mood;
        if (tags !== undefined) updateData.tags = tags;
        if (note !== undefined) updateData.note = note;

        const updatedMood = await Mood.findByIdAndUpdate(moodId, updateData, { new: true });

        res.status(200).json(updatedMood);
    } catch (e) {
        console.error("Error in updateMood controller:", e);
        res.status(500).json({ message: "Internal server error." });
    }
}

export const getMoodAnalytics = async (req, res) => {
    try {
        const userId = req.user._id;

        const analytics = await Mood.aggregate([
            { $match: { userId: userId } },
            {
                $group: {
                    _id: null,
                    averageMood: { $avg: "$mood" },
                    highest: { $max: "$mood" },
                    lowest: { $min: "$mood" },
                    totalEntries: { $sum: 1 }
                }
            }
        ]);

        if (!analytics.length) return res.json({ averageMood: 0, highest: 0, lowest: 0, totalEntries: 0 });

        res.json(analytics[0]);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch mood analytics" });
    }
};







