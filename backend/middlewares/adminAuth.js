const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Admin Authentication Middleware
 * Verifies the JSON Web Token (JWT) sent in the request headers.
 * Ensures that the user has a valid Admin token before allowing access to protected routes.
 * 
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
const authenticate = (req, res, next) => {
  // Retrieve the token from the 'authorization' header
  const token = req.headers.authorization;

  if (token) {
    // Verify the token using the secret key from environment variables
    const decoded = jwt.verify(token, process.env.key);

    if (decoded) {
      // If valid, extract the adminID and attach it to the request body
      // This allows subsequent route handlers to know which admin is performing the action
      const adminID = decoded.adminID;
      req.body.adminID = adminID;
      next(); // Proceed to the next middleware or route handler
    } else {
      res.send("You cannot edit this token.");
    }
  } else {
    res.send("Inadequate permissions, Please login first.");
  }
};

module.exports = { authenticate };
