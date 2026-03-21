const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    bookingType: {
      type: String,
      enum: ["online", "offline"],
      required: true,
    },

    bookingStatus: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed", "cancelled"],
      default: "pending",
    },

    appointmentDateTime: {
      type: Date,
      required: true,
    },

    meetingLink: {
      type: String,
    },

    clinicAddress: {
      type: String,
    },
  },
  { timestamps: true },
);

// Prevent double booking (same doctor + same time)
appointmentSchema.index(
  { doctor: 1, appointmentDateTime: 1 },
  { unique: true },
);

module.exports = mongoose.model("Appointment", appointmentSchema);
