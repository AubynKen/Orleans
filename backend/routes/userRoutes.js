const mongoose = require("mongoose");
const express = require("express");
const { authenticateUser, getUserProfile } = require("../controllers/userControllers");
const { protect } = require("../middlewares/authenticationMiddleware");
// const { getProducts, getProductById } = require("../controllers/productControllers");

const router = express.Router();

router.route("/login").post(authenticateUser);
router.route("/profile").get(protect, getUserProfile);

module.exports = router;
