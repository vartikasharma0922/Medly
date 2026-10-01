const mongoose = require("mongoose");

/**
 * Hospital Schema
 * Aggregates dashboard statistics for the hospital.
 * Stores counts of various entities for quick dashboard rendering.
 */
const hospitalSchema = mongoose.Schema({
  docNumbers: {
    type: Number, // Total doctors
  },

  patientNumbers: {
    type: Number, // Total patients
  },

  nurseNumbers: {
    type: Number, // Total nurses
  },

  ambulanceNumbers: {
    type: Number, // Total ambulances
  },

  roomsNumbers: {
    type: Number, // Total rooms
  },

  bedNumbers: {
    type: Number, // Total beds
  },

  appointmentNumbers: {
    type: Number, // Total appointments
  },

  reportsNumbers: {
    type: Number, // Total reports generated
  },
});

const HospitalModel = mongoose.model("hospital", hospitalSchema);

module.exports = { HospitalModel };
