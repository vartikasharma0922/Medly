const express = require("express");
const { PaymentModel } = require("../models/Payment.model");

const router = express.Router();

/**
 * @route   GET /payments
 * @desc    Get all payment records
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    // Populate report details along with payment status
    const payments = await PaymentModel.find().populate({
      path: "reportID",
    });
    res.status(200).send(payments);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

/**
 * @route   POST /payments/add
 * @desc    Create a new payment record
 * @access  Public
 */
router.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const payment = new PaymentModel(payload);
    await payment.save();
    res.send({ message: "Payment created successfully" });
  } catch (error) {
    res.send("Error occurred, unable to receive the payment.");
    console.log(error);
  }
});

/**
 * @route   PATCH /payments/:paymentId
 * @desc    Update payment status
 * @access  Public
 */
router.patch("/:paymentId", async (req, res) => {
  const id = req.params.paymentId;
  const payload = req.body;
  try {
    const payment = await PaymentModel.findByIdAndUpdate({ _id: id }, payload);
    if (!payment) {
      res.status(404).send({ msg: `Payment with id ${id} not found` });
    }
    res.status(200).send(`Payment with id ${id} updated`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

/**
 * @route   DELETE /payments/:paymentId
 * @desc    Delete a payment record
 * @access  Public
 */
router.delete("/:paymentId", async (req, res) => {
  const id = req.params.paymentId;
  try {
    const payment = await PaymentModel.findByIdAndDelete({ _id: id });
    if (!payment) {
      res.status(404).send({ msg: `Payment with id ${id} not found` });
    }
    res.status(200).send(`Payment with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

module.exports = router;
