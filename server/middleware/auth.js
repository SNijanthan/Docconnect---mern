require("dotenv").config();

const jwt = require("jsonwebtoken");

const User = require("../models/user.js");
const Doctor = require("../models/doctor.js");

const tokenAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ error: "Session expired, Please login" });
    }

    const jwtDecoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    let account;

    if (jwtDecoded.role === "user") {
      account = await User.findById(jwtDecoded._id);
    } else {
      account = await Doctor.findById(jwtDecoded._id);
    }

    if (!account) {
      throw new Error("User not exist");
    }

    req.user = account;

    next();
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
};

module.exports = tokenAuth;
