const express = require("express");

const appointmentRoutes = express.Router();

const {
  createAppointment,
  getAppointmentDetails,
  cancelAppointment,
  getBookingsDetails,
  acceptAppointment,
  rejectAppointment,
  completeAppointment,
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
appointmentRoutes.get(
  "/appointments/doctor",
  tokenAuth,
  authorizeUserMiddleware,
  getBookingsDetails,
);
appointmentRoutes.patch(
  "/appointments/:id/accept",
  tokenAuth,
  authorizeUserMiddleware,
  acceptAppointment,
);
appointmentRoutes.patch(
  "/appointments/:id/reject",
  tokenAuth,
  authorizeUserMiddleware,
  rejectAppointment,
);
appointmentRoutes.patch(
  "/appointments/:id/complete",
  tokenAuth,
  authorizeUserMiddleware,
  completeAppointment,
);

module.exports = appointmentRoutes;
