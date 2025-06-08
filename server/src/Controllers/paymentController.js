const {instance} = require('../razorpayInstance.js');
const processPayment = async (req, res) => {
    const option = {
        amount: req.body.amount, // Amount in smallest currency unit (e.g., paise for INR)
        currency: "INR",
        receipt: "receipt#1", // Optional, can be used to track payments
    };
    const order = await instance.orders.create(option);
    res.status(200).json({ success: true, message: "Payment processing not implemented yet",order });
}

const getKey = async (req, res) => {
    try {
        const key = process.env.RAZORPAY_KEY_ID; // Fetch the Razorpay key from environment variables
        if (!key) {
            return res.status(500).json({ success: false, message: "Razorpay key not found" });
        }
        res.status(200).json({ success: true, key });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
module.exports = {
    processPayment,getKey}