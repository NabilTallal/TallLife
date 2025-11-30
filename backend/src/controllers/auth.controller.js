import { generateToken } from "../utils/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../utils/cloudinary.js";

const GENERIC_CLIENT_ERROR = "Authentication failed.";
const GENERIC_SERVER_ERROR = "Internal server error.";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message: "Password must be at least 8 characters long, include one uppercase letter and one number."
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format." });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        generateToken(savedUser._id, res);

        res.status(201).json({
            _id: savedUser._id,
            fullName: savedUser.fullName,
            email: savedUser.email,
            profilePic: savedUser.profilePic
        });
    } catch (error) {
        console.error("Error in signup controller:", error);
        return res.status(500).json({ message: GENERIC_SERVER_ERROR });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        const foundUser = await User.findOne({ email });
        if (!foundUser) return res.status(400).json({ message: GENERIC_CLIENT_ERROR });

        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) return res.status(400).json({ message: GENERIC_CLIENT_ERROR });

        generateToken(foundUser._id, res);

        res.status(200).json({
            _id: foundUser._id,
            fullName: foundUser.fullName,
            email: foundUser.email,
            profilePic: foundUser.profilePic
        });
    } catch (error) {
        console.error("Error in login controller:", error);
        return res.status(500).json({ message: GENERIC_SERVER_ERROR });
    }
};

export const logout = (_, res) => {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully." });
};

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        if (!profilePic) return res.status(400).json({message: "Profile picture is required."});

        const uploadedImage = await cloudinary.uploader.upload(profilePic);

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { profilePic: uploadedImage.secure_url },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error in updateProfile controller:", error);
        return res.status(500).json({ message: GENERIC_SERVER_ERROR });
    }
};
