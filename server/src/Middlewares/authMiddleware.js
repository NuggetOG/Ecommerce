const jwt = require('jsonwebtoken');
const { prisma } = require('../prisma');
require('dotenv').config(); // Add this line at the top of your file

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies && req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Authentication token missing" });
        }

        console.log('Token:', token);  // Log token for debugging
        console.log('JWT_SECRET:', JWT_SECRET);  // Log the secret to check if it's loaded

        const decoded = jwt.verify(token, JWT_SECRET);  // Verify token

        console.log('Decoded Token:', decoded);  // Log decoded token for debugging

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true
            }
        });

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Attach user info to request
        req.user = {
            id: user.id,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`
        };

        // Pass control to next middleware
        next();
    } catch (error) {
        console.error('JWT Error:', error);  // Log the error for debugging
        return res.status(401).json({
            message: `Invalid or expired token. Error: ${error.message}`
        });
    }
};

module.exports = authMiddleware;
