import mongoose from "mongoose";

const moodSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        mood: {
            type: Number,
            required: true,
            min: 1,
            max: 10, // ensure mood is between 1 and 10
        },
        note: {
            type: String,
            required: false,
        },
        tags: {
            type: [String],
            default: [], // default empty array
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

moodSchema.index({ userId: 1, date: -1 });

const Mood = mongoose.model("Mood", moodSchema);

export default Mood;
