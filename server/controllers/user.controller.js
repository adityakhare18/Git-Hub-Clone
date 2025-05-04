
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

// Get all users
exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 }); // Exclude password
        res.status(200).json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Error fetching users", error: err.message });
    }
};

// Sign up user
exports.signUp = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists (case-insensitive)
        const existingUser = await User.findOne({
            $or: [
                { email: { $regex: new RegExp('^' + email + '$', 'i') } },
                { username: { $regex: new RegExp('^' + username + '$', 'i') } }
            ]
        });
        if (existingUser) {
            return res.status(400).json({
                message: existingUser.email === email
                    ? "Email already in use"
                    : "Username already taken"
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save user to database
        await newUser.save();

        // Return success response
        res.status(201).json({
            message: "User registered successfully",
            userId: newUser._id
        });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ message: "Error during sign up", error: err.message });
    }
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("Login attempt with identifier:", email);

        // Find user by email or username (case-insensitive)
        const user = await User.findOne({
            $or: [
                { email: { $regex: new RegExp('^' + email + '$', 'i') } },
                { username: { $regex: new RegExp('^' + email + '$', 'i') } }
            ]
        });

        if (!user) {
            console.log("User not found with identifier:", email);
            return res.status(404).json({ message: "User not found" });
        }

        console.log("User found:", user.username);

        // Compare passwords
        try {
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                console.log("Password mismatch for user:", user.username);
                return res.status(401).json({ message: "Invalid credentials" });
            }
        } catch (bcryptError) {
            console.error("Error comparing passwords:", bcryptError);
            return res.status(500).json({ message: "Error verifying credentials" });
        }

        console.log("Password match successful for user:", user.username);

        // Create a user object without sensitive information
        const userResponse = {
            _id: user._id,
            username: user.username,
            email: user.email,
            repositories: user.repositories || [],
            followedUsers: user.followedUsers || [],
            starRepos: user.starRepos || []
        };

        // Return success response
        res.status(200).json({
            message: "Login successful",
            user: userResponse
        });

        console.log("Login successful for user:", user.username);
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Error during login", error: err.message });
    }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.query.userId || req.body.userId;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const user = await User.findById(userId, { password: 0 }); // Exclude password

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (err) {
        console.error("Error fetching user profile:", err);
        res.status(500).json({ message: "Error fetching user profile", error: err.message });
    }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.body.userId;
        const updates = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Remove fields that shouldn't be updated directly
        delete updates.password;
        delete updates._id;

        const user = await User.findByIdAndUpdate(
            userId,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return updated user without password
        const userResponse = {
            _id: user._id,
            username: user.username,
            email: user.email,
            repositories: user.repositories,
            followedUsers: user.followedUsers,
            starRepos: user.starRepos
        };

        res.status(200).json({ message: "Profile updated successfully", user: userResponse });
    } catch (err) {
        console.error("Error updating user profile:", err);
        res.status(500).json({ message: "Error updating user profile", error: err.message });
    }
};

// Delete user profile
exports.deleteUserProfile = async (req, res) => {
    try {
        const userId = req.body.userId;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).json({ message: "Error deleting user", error: err.message });
    }
};
