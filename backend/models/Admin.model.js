const mongoose = require("mongoose");

/**
 * Admin Schema
 * Defines the structure for Admin users in the database.
 * Admins have full access to manage the system.
 */
const adminSchema = mongoose.Schema({
  userType: {
    type: String,
    default: "admin", // Identifier for Role-Based Access Control
  },

  adminID: {
    type: Number,
    required: true, // Unique ID for finding admins
  },

  adminName: {
    type: String, // Full name
  },

  email: {
    type: String, // Contact email
  },

  password: {
    type: String,
    required: true, // Hashed password
  },

  gender: {
    type: String,
  },

  age: {
    type: Number,
  },

  mobile: {
    type: Number,
    minlength: 10,
  },

  DOB: {
    type: String,
  },

  address: {
    type: String,
  },

  education: {
    type: String,
  },

  image: {
    type: String,
    default:
      "https://res.cloudinary.com/diverse/image/upload/v1674562453/diverse/oipm1ecb1yudf9eln7az.jpg",
  },
});

const AdminModel = mongoose.model("admin", adminSchema);

module.exports = { AdminModel };
