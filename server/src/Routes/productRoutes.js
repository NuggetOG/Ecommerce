const express = require("express");
const router = express.Router();
const checkAdmin = require("../Middlewares/checkAdmin");
const authMiddleware = require("../Middlewares/authMiddleware");
const { createProduct, getAllProducts,bulkCreateProducts, getProductById, updateProductById, deleteProductById } = require("../Controllers/productController");

router
  .route("/")
  .post(authMiddleware, checkAdmin("admin@gmail.com"), createProduct)
  .get(getAllProducts);
router
  .route("/bulkCreate").post(authMiddleware, checkAdmin("admin@gmail.com"), bulkCreateProducts);
router
  .route("/:id")
  .post(authMiddleware, checkAdmin("admin@gmail.com"), updateProductById).get(getProductById);
router
  .route("/delete/:id")
  .post(authMiddleware, checkAdmin("admin@gmail.com"), deleteProductById);
/*
router
  .route("/:id")
  .get(getProductsById)
  .put(authMiddleware, checkAdmin("admin@gmail.com"), updateProductById)
  .delete(authMiddleware, checkAdmin("admin123@gmail.com"), deleteProductById);
*/
module.exports = router;
