const mongoose = require("mongoose");
const { Model, Schema } = mongoose;

const reviewSchema = Model({
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

const productSchema = Model(
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
    imageURL: {
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
    reviewCount: {
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

const productModel = Model("Product", productSchema);
module.exports = productModel;
