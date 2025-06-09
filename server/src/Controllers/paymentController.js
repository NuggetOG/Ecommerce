const { verify } = require('crypto');
const {instance} = require('../razorpayInstance.js');
const crypto = require('crypto');
const { prisma } = require('../prisma.js');
const { sendOrderConfirmationEmail } = require('../Utils/emailConfirmation.js');
const processPayment = async (req, res) => {
    const option = {
        amount: req.body.amount *100, // Amount in smallest currency unit (e.g., paise for INR)
        currency: "INR",
        receipt: "receipt#1", // Optional, can be used to track payments
    };
    const order = await instance.orders.create(option);
    res.status(200).json({ success: true, message: "Payment processing ",order });
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
      return res.status(400).json({ success: false, message: "Missing payment verification data" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.log("Payment verification failed");
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }

    // Update the order status to "APPROVED"
    const updatedOrder = await prisma.order.update({
      where: { razorpayOrderId: razorpay_order_id }, // Match the Razorpay order ID
      data: {
        status: "APPROVED", // Update the status to "APPROVED"
        paymentId: razorpay_payment_id, // Store the Razorpay payment ID
        paymentSignature: razorpay_signature, // Store the Razorpay signature
        paymentDate: new Date(), // Record the payment date
      },
    });
    //emailConfirmation.js 
     const user = await prisma.user.findUnique({ where: { id: updatedOrder.userId } });
    if (user && user.email) {
      await sendOrderConfirmationEmail(user.email, updatedOrder);
    }

    console.log("Payment verified successfully and order updated:", updatedOrder);

    return res.status(200).json({
      success: true,
      message: "Payment verified and order approved successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error in verifyPayment:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
module.exports = {
    processPayment,getKey,verifyPayment}