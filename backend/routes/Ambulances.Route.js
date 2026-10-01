const express = require("express");
const { AmbulanceModel } = require("../models/Ambulance.model");

const router = express.Router();

/**
 * @route   GET /ambulances
 * @desc    Get all ambulances with optional filtering
 * @access  Public
 */
router.get("/", async (req, res) => {
  let query = req.query;
  try {
    const ambulances = await AmbulanceModel.find(query);
    res.status(200).send(ambulances);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

/**
 * @route   POST /ambulances/add
 * @desc    Add a new ambulance
 * @access  Public
 */
router.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const ambulance = new AmbulanceModel(payload);
    await ambulance.save();
  } catch (error) {
    res.send(error);
  }
  res.send("Ambulance Added Successfully");
});

/**
 * @route   PATCH /ambulances/:ambulanceId
 * @desc    Update ambulance details
 * @access  Public
 */
router.patch("/:ambulanceId", async (req, res) => {
  const id = req.params.ambulanceId;
  const payload = req.body;
  try {
    const ambulance = await AmbulanceModel.findByIdAndUpdate(
      { _id: id },
      payload
    );
    if (!ambulance) {
      res.status(404).send({ msg: `Ambulance with id ${id} not found` });
    }
    res.status(200).send(`Ambulance with id ${id} updated`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

/**
 * @route   DELETE /ambulances/:ambulanceId
 * @desc    Delete an ambulance
 * @access  Public
 */
router.delete("/:ambulanceId", async (req, res) => {
  const id = req.params.ambulanceId;
  try {
    const ambulance = await AmbulanceModel.findByIdAndDelete({ _id: id });
    if (!ambulance) {
      res.status(404).send({ msg: `Ambulance with id ${id} not found` });
    }
    res.status(200).send(`Ambulance with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

module.exports = router;
