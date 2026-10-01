const mongoose = require("mongoose");

/**
 * Patient Schema
 * Represents a patient admitted to or visiting the hospital.
 */
const patientSchema = mongoose.Schema({
  userType: {
    type: String,
    default: "patient",
  },

  patientID: {
    type: Number,
    required: true,
  },

  patientName: {
    type: String,
  },

  mobile: {
    type: Number,
    minlength: 10,
  },

  email: {
    type: String,
  },

  password: {
    type: String,
    default: "password", // Default password for patients
  },

  age: {
    type: Number,
  },

  department: {
    type: String, // Department they are being treated in
  },

  gender: {
    type: String,
  },

  bloodGroup: {
    type: String,
  },

  DOB: {
    type: String,
  },

  address: {
    type: String,
  },

  image: {
    type: String,
  },

  disease: {
    type: String, // Diagnosis
  },

  details: {
    type: String, // Additional info
  },

  admitted: {
    type: Boolean,
    default: true,
  },

  date: {
    type: Date, // Admission date
  },

  docID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctor", // Assigned doctor
  },

  nurseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "nurse", // Assigned nurse
  },
});

const PatientModel = mongoose.model("patient", patientSchema);

module.exports = { PatientModel };
