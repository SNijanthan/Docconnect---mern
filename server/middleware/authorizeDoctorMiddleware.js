const authorizeDoctorMiddleware = async (req, res, next) => {
  try {
    const { role } = req.user;

    if (role === "user") {
      return res.status(403).json({ status: false, message: "Access denied" });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = authorizeDoctorMiddleware;
