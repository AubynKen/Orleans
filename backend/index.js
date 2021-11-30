const express = require("express");
const app = express();
const products = require("./data/products");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");

// Configuration for using process.env
dotenv.config();

// Connection to MongoDB using Mongoose
connectDB();

app.get("/", (req, res) => {
  res.send("got it.");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const product = products.find((el) => el._id === productId);
  res.json(product);
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`The application is up and running at port ${port}`);
});
