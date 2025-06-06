const express = require("express");
const router = express.Router();
const checkAdmin = require("../Middlewares/checkAdmin");
const { approveOrder, createOrder, getUserOrders, getOrderById, pendingOrder } = require("../Controllers/orderController");
const authMiddleware = require("../Middlewares/authMiddleware");

// Pass the admin email correctly to the middleware
const adminCheckMiddleware = checkAdmin("admin@gmail.com");

router
  .route("/")
  .post(createOrder)
  .get(getUserOrders);

router
  .route("/:orderId")
  .get(getOrderById);

router
  .route("/pending")
  .get(adminCheckMiddleware, pendingOrder);

router
  .route("/:orderId/approve")
  .put(authMiddleware,adminCheckMiddleware, approveOrder);

module.exports = router;