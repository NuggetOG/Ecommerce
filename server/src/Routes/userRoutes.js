const express = require('express');
const { getUserInfo } = require('../Controllers/userController');
const authMiddleware = require('../Middlewares/authMiddleware');

const router = express.Router();

router.get("/me",authMiddleware,getUserInfo);

module.exports = router;
