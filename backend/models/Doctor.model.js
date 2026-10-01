const mongoose = require("mongoose");

/**
 * Doctor Schema
 * Stores details of medical professionals.
 */
const doctorSchema = mongoose.Schema({
  userType: {
    type: String,
    default: "doctor",
  },

  docID: {
    type: Number,
    required: true,
  },

  docName: {
    type: String,
  },

  mobile: {
    type: Number,
  },

  email: {
    type: String,
  },

  password: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
  },

  gender: {
    type: String,
  },

  bloodGroup: {
    type: String,
  },

  DOB: {
    type: Date,
  },

  address: {
    type: String,
  },

  education: {
    type: String,
  },

  department: {
    type: String, // Specialization e.g., "Cardiology"
  },

  image: {
    type: String,
    default:
      "https://res.cloudinary.com/diverse/image/upload/v1674562453/diverse/oipm1ecb1yudf9eln7az.jpg",
  },

  details: {
    type: String, // Additional bio or notes
  },
});

const DoctorModel = mongoose.model("doctor", doctorSchema);

module.exports = { DoctorModel };
