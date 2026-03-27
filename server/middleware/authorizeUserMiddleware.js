const Appointment = require("../models/appointment.js");
const User = require("../models/user.js");

const authorizeUserMiddleware = async (req, res, next) => {
  try {
    const { role } = req.user;

    if (role === "doctor") {
      return res.status(403).json({ status: false, message: "Access denied" });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = authorizeUserMiddleware;
