const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({
    path: path.resolve(__dirname, "../../.env"),
});

console.log("=================================");
console.log("DATABASE ENVIRONMENT CHECK");
console.log("MONGODB_URI exists:", !!process.env.MONGODB_URI);
console.log("=================================");

if (!process.env.MONGODB_URI) {
    console.error("ERROR: MONGODB_URI environment variable is missing!");
    process.exit(1);
}

const connection = mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
});

module.exports = { connection };
