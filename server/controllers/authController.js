const User = require("../models/user.js");
const Doctor = require("../models/doctor.js");
const {
  validateBasicData,
  validateDoctorSignupData,
} = require("../utils/inputValidation.js");
const hashPassword = require("../utils/passwordHashing.js");
const loginService = require("../services/authService.js");

// * For user

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

    const hashedPassword = await hashPassword(req);

    const newUser = new User({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
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

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await loginService(User, email, password);

    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({
      status: true,
      message: "User logged in successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

// * For doctors

// ! New doctor register

const doctorRegister = async (req, res) => {
  try {
    validateBasicData(req);
    validateDoctorSignupData(req);

    const {
      name,
      email,
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

    const hashedPassword = await hashPassword(req);

    const newDoctor = new Doctor({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
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

const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await loginService(Doctor, email, password);

    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({
      status: true,
      message: "Doctor logged in successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

// ! User && Doctor logout

const logout = async (req, res) => {
  try {
    res
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
      })
      .status(200)
      .json({
        status: true,
        message: "Logged out successfully",
      });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  userRegister,
  userLogin,
  doctorRegister,
  doctorLogin,
  logout,
};
