const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(`Connection to database failed with error: \n${err.message}`);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
