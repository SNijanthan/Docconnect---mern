const express = require("express");

const doctorRouters = express.Router();

const {
  getDoctors,
  getDoctorById,
  getDoctorBySpecialty,
} = require("../controllers/doctorController.js");

const tokenAuth = require("../middleware/authMiddleware.js");

doctorRouters.get("/doctors", tokenAuth, getDoctors);
doctorRouters.get("/doctor/:id", tokenAuth, getDoctorById);
doctorRouters.get("/doctors/specialty", tokenAuth, getDoctorBySpecialty);

module.exports = doctorRouters;
