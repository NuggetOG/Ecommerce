const express = require("express");
const router = express.Router();
const authMiddleware = require('../Middlewares/authMiddleware');
const {getUserWishlist,addToWishlist,deleteWishlistItem}  = require("../Controllers/wishlistController");
router
  .route("/")
  .get(authMiddleware, getUserWishlist);

router
  .route("/add")
  .post(authMiddleware, addToWishlist);

router
  .route("/delete/:id")
  .delete(authMiddleware, deleteWishlistItem);

module.exports = router;