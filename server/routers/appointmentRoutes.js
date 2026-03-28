const express = require("express");

const appointmentRoutes = express.Router();

const {
  createAppointment,
  getAppointmentDetails,
  cancelAppointment,
} = require("../controllers/appointmentController.js");

const tokenAuth = require("../middleware/authMiddleware.js");
const authorizeUserMiddleware = require("../middleware/authorizeUserMiddleware.js");

// ! Its a protected route, middleware should be include

appointmentRoutes.post(
  "/appointment",
  tokenAuth,
  authorizeUserMiddleware,
  createAppointment,
);

appointmentRoutes.get(
  "/appointments/user",
  tokenAuth,
  authorizeUserMiddleware,
  getAppointmentDetails,
);

appointmentRoutes.patch(
  "/appointment/:id/cancel",
  tokenAuth,
  authorizeUserMiddleware,
  cancelAppointment,
);

module.exports = appointmentRoutes;
