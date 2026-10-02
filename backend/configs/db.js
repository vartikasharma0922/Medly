const mongoose = require("mongoose");
require("dotenv").config();

console.log("dbURL present:", !!process.env.dbURL);

const connection = mongoose.connect(process.env.dbURL, {
    serverSelectionTimeoutMS: 10000,
});

module.exports = { connection };
