const express = require("express");

const doctorRouter = express.Router();

const {
  getDoctors,
  getDoctorById,
} = require("../controllers/doctorController.js");

const tokenAuth = require("../middleware/auth.js");

doctorRouter.get("/doctors", tokenAuth, getDoctors);
doctorRouter.get("/doctor/:id", tokenAuth, getDoctorById);

module.exports = doctorRouter;
