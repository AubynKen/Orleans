const Products = require("../models/productModel");
const asyncHandler = require("express-async-handler");

const getProducts = asyncHandler(async (req, res) => {
  const products = await Products.find({});
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const product = await Products.findById(productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({
      message: "Nous n’avons pas pu trouver le produit que vous cherchez.",
    });
  }
});

module.exports.getProducts = getProducts;
module.exports.getProductById = getProductById;
