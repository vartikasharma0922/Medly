const express = require("express");
const { PrescriptionModel } = require("../models/Prescription.model");

const router = express.Router();

/**
 * @route   GET /prescriptions
 * @desc    Get all prescriptions (optionally filtered by query)
 * @access  Public
 */
router.get("/", async (req, res) => {
  let query = req.query;
  try {
    const prescriptions = await PrescriptionModel.find(query);
    res.status(200).send(prescriptions);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

/**
 * @route   POST /prescriptions/create
 * @desc    Create a new prescription
 * @access  Public
 */
router.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const prescription = new PrescriptionModel(payload);
    await prescription.save();
  } catch (error) {
    res.send("Error occurred, unable to create a prescription.");
    console.log(error);
  }
  res.send("Prescription successfully created.");
});

/**
 * @route   PATCH /prescriptions/:prescriptionId
 * @desc    Update a prescription
 * @access  Public
 */
router.patch("/:prescriptionId", async (req, res) => {
  const id = req.params.prescriptionId;
  const payload = req.body;
  try {
    const prescription = await PrescriptionModel.findByIdAndUpdate(
      { _id: id },
      payload
    );
    if (!prescription) {
      res.status(404).send({ msg: `Prescription with id ${id} not found` });
    }
    res.status(200).send(`Prescription with id ${id} updated`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

/**
 * @route   DELETE /prescriptions/:prescriptionId
 * @desc    Delete a prescription
 * @access  Public
 */
router.delete("/:prescriptionId", async (req, res) => {
  const id = req.params.prescriptionId;
  try {
    const prescription = await PrescriptionModel.findByIdAndDelete({ _id: id });
    if (!prescription) {
      res.status(404).send({ msg: `Prescription with id ${id} not found` });
    }
    res.status(200).send(`Prescription with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

module.exports = router;
