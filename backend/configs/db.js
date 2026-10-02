const mongoose = require("mongoose");
require("dotenv").config();

console.log("=================================");
console.log("RENDER ENVIRONMENT CHECK");
console.log("dbURL exists:", process.env.dbURL !== undefined);
console.log("dbURL is empty:", !process.env.dbURL);
console.log("=================================");

if (!process.env.dbURL) {
    console.error("ERROR: dbURL environment variable is missing!");
    process.exit(1);
}

const connection = mongoose.connect(process.env.dbURL, {
    serverSelectionTimeoutMS: 10000,
});

module.exports = { connection };
