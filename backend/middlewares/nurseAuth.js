const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Nurse Authentication Middleware
 * Verifies identity of Nurses using JWT.
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
      // Attach nurseID to request for use in downstream controllers
      const nurseID = decoded.nurseID;
      req.body.nurseID = nurseID;
      next();
    } else {
      res.send("You cannot edit this token.");
    }
  } else {
    res.send("Inadequate permissions, Please login first.");
  }
};

module.exports = { authenticate };
