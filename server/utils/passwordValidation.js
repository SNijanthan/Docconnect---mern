const bcrypt = require("bcrypt");

const comparePassword = async (password, userPassword) => {
  const comparePassword = await bcrypt.compare(password, userPassword);

  return comparePassword;
};

module.exports = comparePassword;
