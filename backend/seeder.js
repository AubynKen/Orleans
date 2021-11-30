const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Order = require("./models/orderModel.js");
const Product = require("./models/productModel.js");
const User = require("./models/userModel.js");
const userSeedData = require("./data/users.js");
const productSeedData = require("./data/products.js");

connectDB();

const seedDatabase = async () => {
  try {
    // empty the current database
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // insert user seed data into the db
    const createdUsers = await User.insertMany(userSeedData);

    // link adminUser to the products and add to the db
    const adminUser = createdUsers.find((usr) => usr.isAdmin);
    const productDataWithUser = productSeedData.map((el) => ({
      ...el,
      user: adminUser._id,
    }));
    await Product.insertMany(productDataWithUser);
    console.log("The database is seeded successfully");
  } catch (err) {
    console.error(err.message);
    process.exit(1); // exit with failure
  }
};

seedDatabase();
