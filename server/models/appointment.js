const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
      index: true,
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
      index: true,
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

appointmentSchema.index({ doctor: 1, bookingStatus: 1 });
appointmentSchema.index({ user: 1, bookingStatus: 1 });

appointmentSchema.index({ createdAt: -1 });

// Prevent double booking (same doctor + same time)
appointmentSchema.index(
  { doctor: 1, appointmentDateTime: 1 },
  { unique: true },
);

module.exports = mongoose.model("Appointment", appointmentSchema);
