const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
    validate: {
      validator: (v) => v >= 0 && v <= 5,
      message: "{VALUE} should be between 0 and 5",
    },
  },
  comment: {
    type: String,
    required: true,
  },
});

const productSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    brand: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
      //get: (value) => Math.round(value * 10) / 10, // Only round to 1 decimal points
    },
    numReviews: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
    },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;
