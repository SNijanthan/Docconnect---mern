const express = require("express");

const authRoutes = express.Router();

const {
  userRegister,
  userLogin,
  doctorRegister,
  doctorLogin,
  logout,
} = require("../controllers/authController.js");

authRoutes.post("/user/register", userRegister);
authRoutes.post("/user/login", userLogin);
authRoutes.post("/doctor/register", doctorRegister);
authRoutes.post("/doctor/login", doctorLogin);
authRoutes.post("/logout", logout);

module.exports = authRoutes;
