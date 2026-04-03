const Doctor = require("../models/doctor.js");

const getDoctors = async (req, res) => {
  try {
    // * 1. Get query params
    let { page = 1, limit = 10 } = req.query;

    // * 2. Convert to numbers
    page = parseInt(page);
    limit = parseInt(limit);

    // * 3. Prevent abuse
    limit = Math.min(limit, 50);

    // * 4. Calculate skip
    const skip = (page - 1) * limit;

    const doctors = await Doctor.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Doctor.countDocuments();

    res.status(200).json({
      status: true,
      message: "Data fetched successfully",
      data: doctors,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
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

module.exports = { getDoctors, getDoctorById };
