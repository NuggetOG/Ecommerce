const express = require('express');
const router = express.Router();
const { createCart, updateCartQuantity, deleteCartItem, getUserCart} = require("../Controllers/cartController");
const authMiddleware = require('../Middlewares/authMiddleware');

router
    .route("/")
    .get(authMiddleware, getUserCart);
router
    .route("/create-cart")
    .post(authMiddleware, createCart);
router
    .route("/update-quantity/:id")
    .put(authMiddleware, updateCartQuantity);
router
    .route("/delete-cart-item/:id")
    .delete(authMiddleware, deleteCartItem);

module.exports = router;