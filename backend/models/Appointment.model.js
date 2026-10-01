const mongoose = require("mongoose");

/**
 * Appointment Schema
 * Manages appointment bookings between patients and the hospital.
 */
const appointmentSchema = mongoose.Schema({
  userType: {
    type: String,
    default: "patient",
  },

  patientID: {
    type: Number,
    required: true, // Links to the Patient entity
  },

  patientName: {
    type: String,
  },

  mobile: {
    type: Number,
  },

  email: {
    type: String,
  },

  address: {
    type: String,
  },

  disease: {
    type: String, // Reason for visit
  },

  department: {
    type: String, // e.g., "Cardiology", "Neurology"
  },

  time: {
    type: String, // Appointment time slot
  },

  date: {
    type: String, // Date of appointment
  },

  age: {
    type: Number,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },
});

const AppointmentModel = mongoose.model("appointment", appointmentSchema);

module.exports = { AppointmentModel };
