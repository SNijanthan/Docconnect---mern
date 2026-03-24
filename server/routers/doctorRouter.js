const express = require("express");

const doctorRouter = express.Router();

const {
  getDoctors,
  getDoctorById,
} = require("../controllers/doctorController.js");

doctorRouter.get("/doctors", getDoctors);
doctorRouter.get("/doctor/:id", getDoctorById);

module.exports = doctorRouter;
