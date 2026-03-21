require("dotenv").config();

const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = connectToDB;
