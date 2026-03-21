const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  firstLine: { type: String, required: true, trim: true },
  secondLine: { type: String, default: "", trim: true },
  city: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
});

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    address: {
      type: addressSchema,
      required: true,
    },

    specialties: {
      type: [String],
      required: true,
    },

    credentials: {
      type: [String],
      required: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    role: {
      type: String,
      enum: ["doctor"],
      default: "doctor",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Doctor", doctorSchema);
