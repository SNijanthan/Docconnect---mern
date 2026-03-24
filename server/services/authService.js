const comparePassword = require("../utils/passwordValidation.js");

const loginService = async (Model, email, password) => {
  const user = await Model.findOne({ email });

  if (!user) {
    throw new Error("User does not exist");
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  return user;
};

module.exports = loginService;
