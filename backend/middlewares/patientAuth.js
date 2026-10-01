const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Patient Authentication Middleware
 * Ensures that the request is coming from an authenticated Patient.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const decoded = jwt.verify(token, process.env.key);

    if (decoded) {
      // Attach patientID to request for personalized data retrieval
      const patientID = decoded.patientID;
      req.body.patientID = patientID;
      next();
    } else {
      res.send("You cannot edit this token.");
    }
  } else {
    res.send("Inadequate permissions, Please login first.");
  }
};

module.exports = { authenticate };
