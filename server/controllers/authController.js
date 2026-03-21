const User = require("../models/user.js");
const Doctor = require("../models/doctor.js");
const {
  validateBasicData,
  validateDoctorSignupData,
} = require("../utils/inputValidation.js");

// ! For user

// ! New user register
const userRegister = async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;

    validateBasicData(req);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ status: false, message: "Email already exists..." });
    }

    const newUser = new User({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      gender,
    });

    await newUser.save();

    return res
      .status(201)
      .json({ status: true, message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
};

// ! User login
const userLogin = (req, res) => {};

// ! For doctors

// ! New doctor register
const doctorRegister = async (req, res) => {
  try {
    validateBasicData(req);
    validateDoctorSignupData(req);

    const {
      name,
      email,
      password,
      gender,
      imageUrl,
      phone,
      address,
      specialties,
      credentials,
    } = req.body;

    const existingDoctor = await Doctor.findOne({ email });

    if (existingDoctor) {
      return res
        .status(409)
        .json({ status: false, message: "Email already exists..." });
    }

    const newDoctor = new Doctor({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      imageUrl: imageUrl && imageUrl.trim() !== "" ? imageUrl : undefined,
      gender,
      phone,
      address,
      specialties,
      credentials,
    });

    await newDoctor.save();

    return res
      .status(201)
      .json({ status: true, message: "Doctor created successfully" });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
};

// ! doctor login
const doctorLogin = (req, res) => {};

module.exports = { userRegister, userLogin, doctorRegister, doctorLogin };
