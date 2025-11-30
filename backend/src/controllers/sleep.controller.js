import Sleep from "../models/sleep.model.js";

export const addSleep = async (req, res) => {
    try {
        const { sleepHours, energyLevel, quality, note, date } = req.body;
        const loggedInUser = req.user._id;

        // Convert to numbers safely
        const sleepHoursNum = parseFloat(sleepHours);
        const energyLevelNum = parseInt(energyLevel);
        const qualityNum = parseInt(quality);

        // Validate required fields
        if (
            sleepHoursNum == null || isNaN(sleepHoursNum) ||
            energyLevelNum == null || isNaN(energyLevelNum) ||
            qualityNum == null || isNaN(qualityNum)
        ) {
            return res.status(400).json({ message: "Please fill in the required fields with valid numbers!" });
        }

        const newSleep = new Sleep({
            userId: loggedInUser,
            sleepHours: sleepHoursNum,
            energyLevel: energyLevelNum,
            quality: qualityNum,
            note: note || "",
            date: date ? new Date(date) : new Date(),
        });

        await newSleep.save();

        res.status(201).json(newSleep);
    } catch (e) {
        console.error("Error in addSleep controller:", e);
        res.status(500).json({ message: "Internal server error." });
    }
};

function convertQualityToNumber(text) {
    switch (text.toLowerCase()) {
        case "poor": return 2;
        case "fair": return 4;
        case "good": return 7;
        case "excellent": return 10;
        default: return 5;
    }
}


export const getSleep = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        const sleepRecords = await Sleep.find({ userId: loggedInUser }).sort({ date: -1 });

        res.status(200).json(sleepRecords);
    } catch (e) {
        console.error("Error in getSleep controller:", e);
        res.status(500).json({ message: "Internal server error." });
    }
};

export const getSleepByDate = async (req, res) => {
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

        const sleepRecords = await Sleep.find({
            userId: loggedInUser,
            date: { $gte: start, $lte: end },
        });

        if (!sleepRecords.length) {
            return res.status(404).json({ message: "No sleep record found for this date." });
        }

        res.status(200).json(sleepRecords);
    } catch (e) {
        console.error("Error in getSleepByDate controller:", e);
        res.status(500).json({ message: "Internal server error." });
    }
};

export const deleteSleep = async (req, res) => {
    try {
        const sleepId = req.params.id;
        const userId = req.user._id;

        const sleepRecord = await Sleep.findOne({ _id: sleepId, userId });

        if (!sleepRecord) {
            return res.status(404).json({ message: "No sleep record was found." });
        }

        await Sleep.findByIdAndDelete(sleepId);

        res.status(200).json({ message: "The sleep record was deleted successfully." });
    } catch (e) {
        console.error("Error in deleteSleep controller:", e);
        res.status(500).json({ message: "Internal server error." });
    }
};

export const updateSleep = async (req, res) => {
    try {
        const sleepId = req.params.id;
        const { sleepHours, energyLevel, quality, note } = req.body;
        const userId = req.user._id;

        const oldSleep = await Sleep.findOne({ _id: sleepId, userId });
        if (!oldSleep) {
            return res.status(404).json({ message: "No sleep record was found." });
        }

        if (sleepHours !== undefined && typeof sleepHours !== "number") {
            return res.status(400).json({ message: "Sleep hours should be a number." });
        }

        const updateData = {};
        if (sleepHours !== undefined) updateData.sleepHours = sleepHours;
        if (energyLevel !== undefined) updateData.energyLevel = energyLevel;
        if (quality !== undefined) updateData.quality = quality;
        if (note !== undefined) updateData.note = note;

        const updatedSleep = await Sleep.findByIdAndUpdate(sleepId, updateData, { new: true });

        res.status(200).json(updatedSleep);
    } catch (e) {
        console.error("Error in updateSleep controller:", e);
        res.status(500).json({ message: "Internal server error." });
    }
}

export const getSleepAnalytics = async (req, res) => {
    try {
        const userId = req.user._id;

        const analytics = await Sleep.aggregate([
            { $match: { userId: userId } },
            {
                $group: {
                    _id: null,
                    avgHours: { $avg: "$sleepHours" },
                    avgQuality: { $avg: "$quality" },
                    totalEntries: { $sum: 1 },
                    minHours: { $min: "$sleepHours" },
                    maxHours: { $max: "$sleepHours" }
                }
            }
        ]);

        if (!analytics.length) return res.json({ avgHours: 0, avgQuality: 0, totalEntries: 0, minHours: 0, maxHours: 0 });

        res.json(analytics[0]);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch sleep analytics" });
    }
};

