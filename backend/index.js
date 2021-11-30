const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const errorHandler = require("./utils/errorHandler.js");

/// Routers
const productRoutes = require("./routes/productRoutes.js");

// Configuration for using process.env
dotenv.config();

// Connection to MongoDB using Mongoose
connectDB();

app.get("/", (req, res) => {
  res.send("Vous êtes sur l’URL de base de l’API d’Orléans.");
});

app.use("/api/products", productRoutes);

// if none of the above routes is matched
app.use((req, res, next) => {
  res.status(404);
  const err = new Error("404 la page que vous cherchez n’est pas disponible.");
  next(err);
});

app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`The application is up and running at port ${port}`);
});
