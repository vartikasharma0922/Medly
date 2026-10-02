const express = require("express");
const { connection } = require("./configs/db");
require("dotenv").config();
const cors = require("cors");

// Import all route handlers
const adminRouter = require("./routes/Admins.Route");
const ambulanceRouter = require("./routes/Ambulances.Route");
const appointmentRouter = require("./routes/Appointments.Route");
const bedRouter = require("./routes/Beds.Route");
const doctorRouter = require("./routes/Doctors.Route");
const hospitalRouter = require("./routes/Hospitals.Route");
const nurseRouter = require("./routes/Nurses.Route");
const patientRouter = require("./routes/Patients.Route");
const paymentRouter = require("./routes/Payments.route");
const prescriptionRouter = require("./routes/Prescriptions.Route");
const reportRouter = require("./routes/Reports.Route");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Basic route for health check
app.get("/", (req, res) => {
  res.send("Homepage");
});

// App Routes
app.use("/admin", adminRouter);
app.use("/ambulances", ambulanceRouter);
app.use("/appointments", appointmentRouter);
app.use("/beds", bedRouter);
app.use("/doctors", doctorRouter);
app.use("/hospitals", hospitalRouter);
app.use("/nurses", nurseRouter);
app.use("/patients", patientRouter);
app.use("/payments", paymentRouter);
app.use("/prescriptions", prescriptionRouter);
app.use("/reports", reportRouter);

// Start server only after database connection succeeds
const port = process.env.PORT || process.env.port || 8080;

async function startServer() {
  try {
    await connection;
    console.log("Connected to DB");

    app.listen(port, () => {
      console.log(`Listening at port ${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to DB");
    console.error(error);
    process.exit(1);
  }
}

startServer();
