const nodemailer = require("nodemailer");
require("dotenv").config({ path: "/home/kartikey/Desktop/blacro/server/.env" });

async function sendOrderConfirmationEmail(toEmail, order) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
      user: "blacro27@gmail.com",
      pass: process.env.GMAIL_APP_PASSWORD, // Use the generated App Password here
      },
    });
        console.log("GMAIL_APP_PASSWORD:", process.env.GMAIL_APP_PASSWORD);


    const mailOptions = {
      from: '"Blacro" <no-reply@blacro.com>',
      to: toEmail,
      subject: "Order Confirmation",
      text: `Thank you for your purchase! Your order with Order Id ${order.id} has been confirmed. Total Price: ₹${order.totalPrice}`,
      html: `<p>Thank you for your purchase!</p>
             <p>Your order with Order Id <strong>${order.id}</strong> has been confirmed.</p>
             <p>Total Price: <strong>₹${order.totalPrice}</strong></p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId); // Log the message ID
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info)); // Log the preview URL for testing
  } catch (error) {
    console.error("Error sending email:", error); // Log any errors
  }
}

module.exports = { sendOrderConfirmationEmail };