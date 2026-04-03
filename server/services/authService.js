const comparePassword = require("../utils/passwordValidation.js");

const jwt = require("jsonwebtoken");

const loginService = async (Model, email, password) => {
  const user = await Model.findOne({ email });

  if (!user) {
    throw new Error("User does not exist");
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1d",
    },
  );

  return token;
};

module.exports = loginService;
