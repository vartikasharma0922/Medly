const mongoose = require("mongoose");

/**
 * Payment Schema
 * Tracks payment status for medical reports/bills.
 */
const paymentSchema = mongoose.Schema({
  reportID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "report", // Link to the medical report being paid for
    required: true,
  },

  paid: {
    type: Boolean,
    default: false,
  },
});

const PaymentModel = mongoose.model("payment", paymentSchema);

module.exports = { PaymentModel };
