const express = require("express");
const Route = express.Router();

const { authentication, authorization } = require("../helpers/auth");

const {
  createProduct,
  readProduct,
  updateProduct,
  deleteProduct,
  ignoreFavicon
} = require("../controllers/product");

const { uploadImages } = require("../controllers/upload");

Route
  .post("/product", uploadImages, createProduct)
  .get("/product", readProduct, ignoreFavicon)
  .get("/product/:productId", readProduct)
  .patch("/product/:productId", uploadImages, updateProduct)
  .delete("/product/:productId", deleteProduct)

module.exports = Route;
