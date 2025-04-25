
const User = require("../models/User");  

// Get all users
exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "Error fetching users", error: err });
    }
};

// Sign up user
exports.signUp = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({
            username,
            email,
            password,
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error during sign up", error: err });
    }
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await user.comparePassword(password); // Assuming you have a method to compare hashed passwords
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // You could use JWT here for session management
        res.status(200).json({ message: "Login successful", user });
    } catch (err) {
        res.status(500).json({ message: "Error during login", error: err });
    }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
    const userId = req.userId;  // Assuming userId is stored in request (e.g., from JWT token)

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Error fetching user profile", error: err });
    }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
    const userId = req.userId;  // Assuming userId is stored in request
    const { username, email, password } = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { username, email, password },
            { new: true }  // Returns the updated document
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (err) {
        res.status(500).json({ message: "Error updating profile", error: err });
    }
};

// Delete user profile
exports.deleteUserProfile = async (req, res) => {
    const userId = req.userId;  // Assuming userId is stored in request

    try {
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User profile deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting profile", error: err });
    }
};
