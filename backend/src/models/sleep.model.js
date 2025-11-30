import mongoose from "mongoose";

const sleepSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        sleepHours: {
            type: Number,
            required: true,
            min: 0,
        },
        energyLevel: {
            type: Number, // e.g., 1-5 scale
            required: true,
            min: 1,
            max: 5,
        },
        quality: {
            type: Number, // 1-10 scale
            required: true,
            min: 1,
            max: 10,
        },
        note: {
            type: String,
            required: false,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

// Optional: index for faster queries by user and date
sleepSchema.index({ userId: 1, date: -1 });

const Sleep = mongoose.model("Sleep", sleepSchema);

export default Sleep;
