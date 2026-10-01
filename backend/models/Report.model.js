const mongoose = require("mongoose");

/**
 * Report Schema
 * Detailed medical report including vitals, medicines, and diagnosis.
 */
const reportSchema = mongoose.Schema({
  docName: {
    type: String,
    required: true,
  },

  docDepartment: {
    type: String,
    required: true,
  },

  docMobile: {
    type: Number,
    required: true,
  },

  medicines: [
    {
      medName: {
        type: String,
      },
      dosage: {
        type: Number,
      },
      duration: {
        type: String,
      },
    },
  ],

  extrainfo: {
    type: String, // Additional notes
  },

  patientName: {
    type: String,
    required: true,
  },

  patientAge: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  patientGender: {
    type: String,
    required: true,
  },

  patientMobile: {
    type: Number,
    required: true,
  },

  patientBloodGroup: {
    type: String,
    required: true,
  },

  patientDisease: {
    type: String,
  },

  patientTemperature: {
    type: Number,
  },

  patientWeight: {
    type: Number,
  },

  patientBP: {
    type: Number,
  },

  patientGlucose: {
    type: Number,
  },

  date: {
    type: String,
  },

  time: {
    type: String,
  },
});

const ReportModel = mongoose.model("report", reportSchema);

module.exports = { ReportModel };
