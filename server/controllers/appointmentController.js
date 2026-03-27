const Appointment = require("../models/appointment.js");
const User = require("../models/user.js");
const Doctor = require("../models/doctor.js");

// ! For creating appointments

const createAppointment = async (req, res) => {
  try {
    const { _id } = req.user;

    const { doctor, bookingType, appointmentDateTime } = req.body;

    if (!doctor || !appointmentDateTime || !bookingType) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    const existingDoctor = await Doctor.findById(doctor);

    if (!existingDoctor) {
      return res
        .status(400)
        .json({ status: false, message: "Doctor does not exist" });
    }

    const createAppointment = new Appointment({
      user: _id,
      doctor,
      bookingType,
      appointmentDateTime: new Date(appointmentDateTime),
    });

    await createAppointment.save();

    await createAppointment.populate([
      { path: "user", select: "name email" },
      { path: "doctor", select: "name email gender phone specialties" },
    ]);

    return res.status(201).json({
      status: true,
      message: "Appointment created successfully",
      createAppointment,
    });
  } catch (error) {
    return res.status(400).json({ status: false, error: error.message });
  }
};

// ! Get user appointment details

const getAppointmentDetails = async (req, res) => {
  try {
    const { _id } = req.user;

    const appointments = await Appointment.find({ user: _id }).populate([
      { path: "user", select: "name email" },
      { path: "doctor", select: "name email gender phone specialties" },
    ]);

    if (appointments.length === 0) {
      return res
        .status(200)
        .json({ status: true, message: "No records found" });
    }

    return res.status(200).json({
      status: true,
      message: "Data retrieved successfully",
      appointments,
    });
  } catch (error) {
    return res.status(400).json({ status: false, error: error.message });
  }
};

// ! Cancel appointment

const cancelAppointment = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = {
  createAppointment,
  getAppointmentDetails,
  cancelAppointment,
};
