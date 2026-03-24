const express = require("express");

const authRouter = express.Router();

const {
  userRegister,
  userLogin,
  doctorRegister,
  doctorLogin,
  logout,
} = require("../controllers/authController.js");

authRouter.post("/user/register", userRegister);
authRouter.post("/user/login", userLogin);
authRouter.post("/doctor/register", doctorRegister);
authRouter.post("/doctor/login", doctorLogin);
authRouter.post("/logout", logout);

module.exports = authRouter;
