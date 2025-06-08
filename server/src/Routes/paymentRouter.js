const express = require("express");
const router = express.Router();
const checkAdmin = require("../Middlewares/checkAdmin");
const { processPayment, getKey, verifyPayment } = require("../Controllers/paymentController");
const authMiddleware = require("../Middlewares/authMiddleware");

router
    .route("/payment/process")
    .post(authMiddleware,processPayment);
router
    .route("/getkey")
    .get(authMiddleware,getKey);
router
    .route("/verify")
    .post(verifyPayment); // Assuming verifyPayment is the same as processPayment for now
// Export the router
module.exports = router;