const bcrypt = require("bcrypt");

const hashPassword = async (req) => {
  const { password } = req.body;

  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(password, saltRounds);

  return hashPassword;
};

module.exports = hashPassword;
