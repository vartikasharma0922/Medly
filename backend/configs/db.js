/**
 * Database Configuration
 * Establishes a connection to the MongoDB database using Mongoose.
 * The connection string is loaded from environment variables for security.
 */
const mongoose = require("mongoose");
require("dotenv").config();

/**
 * Connect to MongoDB using the dbURL from environment variables.
 * Logic is handled by mongoose.connect().
 */
const connection = mongoose.connect(process.env.dbURL, {
	serverSelectionTimeoutMS: 10000,
});

// Export the connection promise to be used in the main application entry point
module.exports = { connection };
