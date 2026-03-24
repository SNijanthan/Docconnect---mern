const Doctor = require("../models/doctor.js");

const getDoctors = async (req, res) => {
  try {
    const getAllDoctors = await Doctor.find();

    res.status(200).json({
      status: true,
      message: "Data retrieved successfully",
      getAllDoctors,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

const getDoctorById = async () => {};

module.exports = { getDoctors, getDoctorById };
