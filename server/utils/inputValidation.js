const validator = require("validator");

// 🔥 Common validation
const validateBasicData = (req) => {
  const { name, email, password, gender } = req.body;

  if (!name || !email || !password || !gender) {
    throw new Error("Fields cannot be empty");
  }

  if (name.length < 3 || name.length > 30) {
    throw new Error("Name should be between 3 to 30 characters");
  }

  if (email.length < 3 || email.length > 40) {
    throw new Error("Email should be between 3 to 40 characters");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

const validateDoctorSignupData = (req) => {
  const { phone, address, specialties, credentials } = req.body;

  if (!phone || !address || !specialties || !credentials) {
    throw new Error("Fields cannot be empty");
  }

  if (!validator.isMobilePhone(phone + "")) {
    throw new Error("Invalid phone number");
  }

  if (!Array.isArray(specialties) || specialties.length === 0) {
    throw new Error("Specialties must be a non-empty array");
  }

  if (!Array.isArray(credentials) || credentials.length === 0) {
    throw new Error("Credentials must be a non-empty array");
  }
};

module.exports = { validateBasicData, validateDoctorSignupData };
