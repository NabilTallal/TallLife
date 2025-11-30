import mongoose from "mongoose";

const habitSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        habit: {
            type: String,
            required: true, // habit name is required
        },
        note: {
            type: String,
            required: false,
        },
        tags: {
            type: [String],
            default: [],
        },
        startTime: {
            type: Date,
            required: true,
        },
        endTime: {
            type: Date,
            required: true,
        },
        duration: {
            type: Number, // in minutes
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

// Optional: index for faster queries by user and date
habitSchema.index({ userId: 1, date: -1 });

const Habit = mongoose.model("Habit", habitSchema); // fixed name

export default Habit;
