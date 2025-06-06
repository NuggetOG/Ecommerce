const express = require('express');
const { getUserInfo,updateUserById } = require('../Controllers/userController');
const authMiddleware = require('../Middlewares/authMiddleware');

const router = express.Router();

router
    .route('/')
    .get(authMiddleware, getUserInfo); // Get user info
router
    .route('/:userId')
    .put(authMiddleware, updateUserById); // Update user info by ID
module.exports = router;

