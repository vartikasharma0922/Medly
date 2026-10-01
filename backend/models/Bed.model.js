const mongoose = require("mongoose");

/**
 * Bed Schema
 * Tracks room and bed allocation within the hospital.
 */
const bedSchema = mongoose.Schema({
  bedNumber: {
    type: Number,
    required: true,
  },

  roomNumber: {
    type: Number,
    required: true,
  },

  occupied: {
    type: String, // Status e.g., "true", "false"
  },

  patientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patient", // Reference to the Patient model if occupied
  },
});

const BedModel = mongoose.model("bed", bedSchema);

module.exports = { BedModel };
