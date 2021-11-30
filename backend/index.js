const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");

/// Routers
const productRoutes = require("./routes/productRoutes.js");

// Configuration for using process.env
dotenv.config();

// Connection to MongoDB using Mongoose
connectDB();

app.get("/", (req, res) => {
  res.send(
    "Vous êtes sur l’URL de base de l’API d’Orléans."
  );
});

app.use("/api/products", productRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`The application is up and running at port ${port}`);
});
