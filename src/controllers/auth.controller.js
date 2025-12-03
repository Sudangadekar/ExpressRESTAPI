import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js"

/**
 * REGISTER USER
 */
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    //Check if user exist or not
    const existing = await User.findOne({ email });
    if (existing) {
        return res.status(400).json({ message: 'Email already registered.' });
    }

    //Hash password
    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
        name,
        email,
        password: hashPassword
    })
    res.status(201).json({ message: "User registered successfully." });
}

/**
 * LOGIN USER
 */
export const login = async (req, res) => {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Invalid email" });
    }

    // Verify password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT
    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        {
            expiresIn: "5m"
        }
    );

    res.json({
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    });
}