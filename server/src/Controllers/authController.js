const { prisma } = require('../prisma');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config(); // Add this line at the top of your file

const JWT_SECRET = process.env.JWT_SECRET;

// ✅ Register Controller
const registerUser = async (req, res) => {
    try {
        console.log("Register Body:", req.body);
        const { email, firstName, lastName, password } = req.body;

        // Check existing user
        const existing = await prisma.user.findUnique({
            where: { email }
        });

        if (existing) {
            return res.status(401).json({ success :"false",message: "Email already registered" });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await prisma.user.create({
            data: {
                email,
                firstName,
                lastName,
                hashedPassword
            }
        });

        // Generate JWT token
        const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '1d' });

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        return res.status(201).json({ message: "Registration successful!" });
    } catch (err) {
        console.log("error:", err);
        return res.status(500).json({ success: false, error: err.message });
    }
}

// ✅ Login Controller
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email },
            include:{
                Cart:true,
                Wishlist:true,
            }
        });

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.hashedPassword);

        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid password' });
        }

        // Generate token
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000
        });
        
        return res.status(200).json({
            success: true,
            message: "Login successful!",
            user,
          });
          
              } catch (err) {
        console.log(err.message);
        return res.status(500).json({ success: false, error: err.message });
    }
}

// ✅ Export using named exports
module.exports = {
    registerUser,
    loginUser
};
