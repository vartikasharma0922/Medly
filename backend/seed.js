/**
 * Database Seed Script
 * Creates default admin user and sample data
 * for the Hospital Management System
 */

const mongoose = require("mongoose");
const path = require("path");

// Load .env from the Medly project root
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const { AdminModel } = require("./models/Admin.model");
const { DoctorModel } = require("./models/Doctor.model");
const { NurseModel } = require("./models/Nurse.model");

// Use the same environment variable as Render
const dbURL = process.env.MONGODB_URI;

if (!dbURL) {
  console.error("❌ MONGODB_URI is not set");
  process.exit(1);
}

async function seed() {
  try {
    console.log("🌱 Starting database seed...");
    console.log("📦 Connecting to MongoDB...");

    await mongoose.connect(dbURL);

    console.log("✅ Connected to MongoDB");

    // --------------------------------------------------
    // ADMIN
    // --------------------------------------------------

    const existingAdmin = await AdminModel.findOne({
      adminID: 100,
    });

    if (existingAdmin) {
      console.log(
        "⚠️ Default admin already exists, skipping admin creation"
      );
    } else {
      const defaultAdmin = new AdminModel({
        adminID: 100,
        adminName: "Super Admin",
        email: "admin@hospital.com",
        password: "masai",
        gender: "Male",
        age: 35,
        mobile: 1234567890,
        DOB: "1989-01-01",
        address: "Hospital Main Building",
        education: "MBA Healthcare Management",
      });

      await defaultAdmin.save();

      console.log("✅ Default admin created");
    }

    // --------------------------------------------------
    // DOCTOR
    // --------------------------------------------------

    const existingDoctor = await DoctorModel.findOne({
      docID: 101,
    });

    if (existingDoctor) {
      console.log(
        "⚠️ Sample doctor already exists, skipping doctor creation"
      );
    } else {
      const sampleDoctor = new DoctorModel({
        userType: "doctor",
        docID: 101,
        docName: "Vartika Sharma",
        email: "vartika@hms.com",
        password: "masai",
        mobile: 9876543210,
        age: 32,
        gender: "Female",
        bloodGroup: "A+",
        DOB: new Date("1992-05-15"),
        address: "123 Medical Drive, New York",
        education: "MBBS, MD Cardiology",
        department: "Cardiology",
        details:
          "Senior cardiologist with over 10 years of experience.",
      });

      await sampleDoctor.save();

      console.log("✅ Sample doctor created");
    }

    // --------------------------------------------------
    // NURSE
    // --------------------------------------------------

    const existingNurse = await NurseModel.findOne({
      nurseID: 102,
    });

    if (existingNurse) {
      console.log(
        "⚠️ Sample nurse already exists, skipping nurse creation"
      );
    } else {
      const sampleNurse = new NurseModel({
        nurseID: 102,
        nurseName: "Jane Doe",
        email: "nurse@hospital.com",
        password: "masai",
        mobile: 5555555555,
        age: 30,
        gender: "Female",
        bloodGroup: "A+",
        DOB: "1994-08-20",
        address: "Nurse's Quarters, Room 201",
        education: "BSc Nursing",
        details: "Senior Nurse, ICU Specialist",
      });

      await sampleNurse.save();

      console.log("✅ Sample nurse created");
    }

    // --------------------------------------------------
    // DONE
    // --------------------------------------------------

    console.log("\n🎉 Database seeding completed successfully!");

    await mongoose.disconnect();

    console.log("✅ Disconnected from MongoDB");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:");
    console.error(error);

    await mongoose.disconnect();

    process.exit(1);
  }
}

seed();
