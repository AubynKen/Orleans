const mongoose = require("mongoose");
const express = require("express");
const Products = require("../models/productModel");
const errorHandler = require("express-async-handler");

const router = express.Router();

router.get(
  "/",
  errorHandler(async (req, res) => {
    const products = await Products.find({});
    res.json(products);
  })
);

router.get(
  "/:id",
  errorHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Products.findById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({
        message: "Nous n’avons pas pu trouver le produit que vous cherchez.",
      });
    }
  })
);

module.exports = router;
