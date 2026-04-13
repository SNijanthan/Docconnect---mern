const Doctor = require("../models/doctor.js");

const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().select("-password");

    res.status(200).json({
      status: true,
      message: "Data fetched successfully",
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const { id } = req?.params;

    const doctor = await Doctor.findById(id).select("-password");

    if (!doctor) {
      return res
        .status(404)
        .json({ status: false, message: "Doctor not found" });
    }

    return res.status(200).json({
      status: true,
      message: "Data retrieved successfully...",
      doctor,
    });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

const getDoctorBySpecialty = async (req, res) => {
  try {
    const specialties = [
      "general-physician",
      "dermatology",
      "psychiatry",
      "pediatrics",
      "gastroenterology",
      "cardiology",
      "orthopedics",
      "neurology",
      "gynecology",
      "ent",
    ];
    const { specialty } = req.query;

    if (!specialties.includes(specialty)) {
      return res
        .status(400)
        .json({ statue: false, message: "Invalid specialty" });
    }
    const doctors = await Doctor.find({ specialties: specialty }).select(
      "-password",
    );

    if (doctors.length === 0) {
      res.status(200).json({
        status: true,
        message: "No data to retrieve",
      });
    }

    return res.status(200).json({
      status: true,
      message: `Doctors with ${specialty} retrieved successfully`,
      doctors,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = { getDoctors, getDoctorById, getDoctorBySpecialty };
