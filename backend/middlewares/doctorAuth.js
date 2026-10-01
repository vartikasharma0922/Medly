const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Doctor Authentication Middleware
 * Verifies the JWT token to ensure the requester is a logged-in Doctor.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const authenticate = (req, res, next) => {
  // Get token from headers
  const token = req.headers.authorization;

  if (token) {
    // Verify token validity
    const decoded = jwt.verify(token, process.env.key);

    if (decoded) {
      // Extract doctorID from valid token and attach to request body
      const doctorID = decoded.doctorID;
      req.body.doctorID = doctorID;
      next();
    } else {
      res.send("You cannot edit this token.");
    }
  } else {
    res.send("Inadequate permissions, Please login first.");
  }
};

module.exports = { authenticate };
