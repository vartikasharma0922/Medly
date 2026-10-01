const mongoose = require("mongoose");

/**
 * Ambulance Schema
 * Stores information about the hospital's ambulance fleet.
 */
const ambulanceSchema = mongoose.Schema({
  type: {
    type: String, // e.g., "ICU", "Basic Life Support"
    required: true,
  },

  charges: {
    type: Number, // Cost per service
    required: true,
  },

  ambulanceID: {
    type: Number,
    required: true, // Unique identifier
  },

  ambulanceDriver: {
    type: String, // Name of the driver
    required: true,
  },

  number: {
    type: Number, // Vehicle registration number
    required: true,
  },
});

const AmbulanceModel = mongoose.model("ambulance", ambulanceSchema);

module.exports = { AmbulanceModel };
