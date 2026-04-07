const Appointment = require("../models/appointment.js");
const Doctor = require("../models/doctor.js");

// * For Users

// ! For creating appointments

const createAppointment = async (req, res) => {
  try {
    const { _id } = req.user;

    const { doctor, bookingType, appointmentDateTime } = req.body;

    if (!doctor || !appointmentDateTime || !bookingType) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    const existingDoctor = await Doctor.findById(doctor);

    if (!existingDoctor) {
      return res
        .status(400)
        .json({ status: false, message: "Doctor does not exist" });
    }

    const createAppointment = new Appointment({
      user: _id,
      doctor,
      bookingType,
      appointmentDateTime: new Date(appointmentDateTime),
    });

    await createAppointment.save();

    await createAppointment.populate([
      { path: "user", select: "name email" },
      { path: "doctor", select: "name email gender phone specialties" },
    ]);

    return res.status(201).json({
      status: true,
      message: "Appointment created successfully",
      createAppointment,
    });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

// ! Get user appointment details

const getAppointmentDetails = async (req, res) => {
  try {
    const { _id } = req.user;

    const appointments = await Appointment.find({ user: _id }).populate([
      { path: "doctor", select: "name email gender phone specialties" },
    ]);

    if (appointments.length === 0) {
      return res
        .status(200)
        .json({ status: true, message: "No records found" });
    }

    return res.status(200).json({
      status: true,
      message: "Data retrieved successfully",
      appointments,
    });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

// ! Cancel appointment

const cancelAppointment = async (req, res) => {
  try {
    const { id } = req?.params;
    const { _id } = req.user;

    const findAppointment = await Appointment.findById(id);

    // ! If the appointment is existing or not

    if (!findAppointment) {
      return res
        .status(404)
        .json({ status: false, message: "No records found" });
    }

    // ! Only the user who created an appointment can delete the appointment

    if (!findAppointment.user.equals(_id)) {
      return res.status(403).json({
        status: false,
        message: "Unauthorized",
      });
    }

    // ! Checking if the appointment is already cancelled or not

    if (findAppointment.bookingStatus === "cancelled") {
      return res.status(400).json({
        status: false,
        message: "Appointment already cancelled",
      });
    }

    // ! Preventing cancelling previous/completed appointments

    if (findAppointment.appointmentDateTime < new Date()) {
      return res.status(400).json({
        status: false,
        message: "Cannot cancel past appointment",
      });
    }

    // ! Updating the booking status as cancelled

    const updateAppointment = await Appointment.findByIdAndUpdate(
      id,
      {
        bookingStatus: "cancelled",
      },
      { runValidators: true, returnDocument: "after" },
    );

    return res.status(200).json({
      status: true,
      message: "Appointment deleted successfully",
      updateAppointment,
    });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

// * For Doctors

// ! Get appointment booking details

const getBookingsDetails = async (req, res) => {
  try {
    const { _id } = req.user;

    const appointments = await Appointment.find({ doctor: _id })
      .populate([{ path: "user", select: "name email gender" }])
      .select("-doctor");

    if (appointments.length === 0) {
      return res
        .status(200)
        .json({ status: true, message: "No records found" });
    }

    return res.status(200).json({
      status: true,
      message: "Data retrieved successfully",
      appointments,
    });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

// ! Accept received appointments

const acceptAppointment = async (req, res) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;

    const updatedAppointment = await Appointment.findOneAndUpdate(
      {
        _id: id,
        doctor: _id,
        bookingStatus: "pending",
      },
      {
        $set: { bookingStatus: "accepted" },
      },
      {
        new: true,
        runValidators: true,
      },
    ).populate({
      path: "user",
      select: "name email gender",
    });

    if (!updatedAppointment) {
      return res.status(404).json({
        status: false,
        message: "Appointment not found or already processed",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Appointment accepted",
      updatedAppointment,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ! Reject received appointments

const rejectAppointment = async (req, res) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;

    const updateAppointment = await Appointment.findOneAndUpdate(
      {
        _id: id,
        doctor: _id,
        bookingStatus: "pending",
      },
      {
        $set: { bookingStatus: "rejected" },
      },
      {
        new: true,
        runValidators: true,
      },
    ).populate({
      path: "user",
      select: "name email gender",
    });

    if (!updateAppointment) {
      return res.status(404).json({
        status: false,
        message: "Appointment not found or already processed",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Appointment rejected",
      updateAppointment,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// ! Update completed appointment detail ["pending", "accepted", "rejected", "completed", "cancelled"]

const completeAppointment = async (req, res) => {
  try {
    const { _id } = req.user; // doctor
    const { id } = req.params;

    const updatedAppointment = await Appointment.findOneAndUpdate(
      {
        _id: id,
        doctor: _id,
        bookingStatus: "accepted",
      },
      {
        $set: {
          bookingStatus: "completed",
        },
      },
      {
        new: true,
        runValidators: true,
      },
    ).populate({
      path: "user",
      select: "name email gender",
    });

    if (!updatedAppointment) {
      return res.status(404).json({
        status: false,
        message: "Appointment not found or not eligible for completion",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Appointment completed successfully",
      updatedAppointment,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  createAppointment,
  getAppointmentDetails,
  cancelAppointment,
  getBookingsDetails,
  acceptAppointment,
  rejectAppointment,
  completeAppointment,
};
