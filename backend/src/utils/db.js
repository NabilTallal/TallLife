import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
    try {
        const { MONGO_URI } = ENV;
        if (!MONGO_URI) {
            throw new Error("MONGO_URI environment variable is not defined.");
        }

        const dbConnection = await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected successfully:", dbConnection.connection.host);
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1); // Exit with failure
    }
};
