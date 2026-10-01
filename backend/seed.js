/**
 * Database Seed Script
 * Creates default admin user and sample data for the Hospital Management System
 */

const mongoose = require("mongoose");
require("dotenv").config();

const { AdminModel } = require("./models/Admin.model");
const { DoctorModel } = require("./models/Doctor.model");
const { NurseModel } = require("./models/Nurse.model");

const dbURL = process.env.dbURL || "mongodb://localhost:27017/hms";

async function seed() {
  try {
    console.log("🌱 Starting database seed...");
    console.log(`📦 Connecting to: ${dbURL}`);
    
    await mongoose.connect(dbURL);
    console.log("✅ Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await AdminModel.findOne({ adminID: 100 });
    if (existingAdmin) {
      console.log("⚠️  Default admin already exists, skipping admin creation");
    } else {
      // Create default admin
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
      console.log("✅ Default admin created (ID: 100, Password: masai)");
    }

    // Check if sample doctor exists
    const existingDoctor = await DoctorModel.findOne({ docID: 101 });
    if (existingDoctor) {
      console.log("⚠️  Sample doctor already exists, skipping doctor creation");
    } else {
      // Create sample doctor
      const sampleDoctor = new DoctorModel({
      userType: "doctor",
      docID: 101,
      docName: "Vartika Sharma",
      email: "vartika@hms.com",
      password: "masai", // Keeping original password format as 'hashedPassword' is not defined
      mobile: 9876543210,
      age: 32,
      gender: "Female",
      bloodGroup: "A+",
      DOB: new Date("1992-05-15"),
      address: "123 Medical Drive, New York",
      education: "MBBS, MD Cardiology",
      department: "Cardiology",
      details: "Senior cardiologist with over 10 years of experience."
    });
      await sampleDoctor.save();
      console.log("✅ Sample doctor created (ID: 101, Password: masai)");
    }

    // Check if sample nurse exists
    const existingNurse = await NurseModel.findOne({ nurseID: 102 });
    if (existingNurse) {
      console.log("⚠️  Sample nurse already exists, skipping nurse creation");
    } else {
      // Create sample nurse
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
      console.log("✅ Sample nurse created (ID: 102, Password: masai)");
    }

    console.log("\n🎉 Database seeding completed successfully!");
    console.log("\n📋 Login Credentials:");
    console.log("   Admin  - ID: 100, Password: masai");
    console.log("   Doctor - ID: 101, Password: masai");
    console.log("   Nurse  - ID: 102, Password: masai");
    
    await mongoose.disconnect();
    console.log("\n✅ Disconnected from MongoDB");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();

