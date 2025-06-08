const { verify } = require('crypto');
const {instance} = require('../razorpayInstance.js');
const crypto = require('crypto');
const processPayment = async (req, res) => {
    const option = {
        amount: req.body.amount *100, // Amount in smallest currency unit (e.g., paise for INR)
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
const verifyPayment = async (req, res) => {
  try {
    console.log("Verifying payment with data:", req.body);

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      console.log("Missing payment verification data");
      return res.status(400).json({ success: false, message: "Missing payment verification data" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    console.log("Expected Signature:", expectedSignature);
    console.log("Received Signature:", razorpay_signature);

    if (expectedSignature !== razorpay_signature) {
      console.log("Payment verification failed");
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }
//update your models here
    // If the signature matches, you can proceed with further processing, like updating order status
    // For example, you might want to update the order status in your database

    console.log("Payment verified successfully");
    return res.status(200).json({ success: true, message: "Transaction verification completed successfully" });
  } catch (error) {
    console.error("Error in verifyPayment:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
module.exports = {
    processPayment,getKey,verifyPayment}