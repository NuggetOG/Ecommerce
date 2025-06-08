const express = require("express");
const router = express.Router();
const checkAdmin = require("../Middlewares/checkAdmin");
const { processPayment, getKey } = require("../Controllers/paymentController");
const authMiddleware = require("../Middlewares/authMiddleware");

router
    .route("/payment/process")
    .post(processPayment);
router
    .route("/getkey")
    .get(getKey);
// Export the router
module.exports = router;