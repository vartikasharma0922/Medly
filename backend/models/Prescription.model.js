const mongoose = require("mongoose");

/**
 * Prescription Schema
 * Models a medical prescription issued by a doctor.
 */
const prescriptionSchema = mongoose.Schema({
  docName: {
    type: String,
    required: true,
  },

  nurseName: {
    type: String,
    required: true, // Nurse handling the case
  },

  hospital: {
    name: {
      type: String,
      required: true,
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pincode: {
        type: Number,
        required: true,
      },
    },
    phone: {
      type: Number,
      required: true,
      minlength: 11,
    },
  },

  medicines: {
    diagnosis: {
      type: String,
    },
    medicineName: {
      type: String,
      required: true,
    },
    type: {
      type: String, // e.g., "Tablet", "Syrup"
      required: true,
    },
    dosage: {
      quantity: {
        type: Number,
        required: true,
      },
      duration: {
        type: Number, // Days
        required: true,
      },
    },
  },

  advice: {
    type: String,
  },

  total: {
    type: Number, // Total cost
    required: true,
  },
});

const PrescriptionModel = mongoose.model("prescription", prescriptionSchema);

module.exports = { PrescriptionModel, prescriptionSchema };
