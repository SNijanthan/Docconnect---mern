const express = require("express");

const authRouter = express.Router();

const {
  userRegister,
  userLogin,
  doctorRegister,
  doctorLogin,
} = require("../controllers/authController.js");

authRouter.post("/user/register", userRegister);
authRouter.post("/user/login", userLogin);
authRouter.post("/doctor/register", doctorRegister);
authRouter.post("/doctor/login", doctorLogin);

module.exports = authRouter;
