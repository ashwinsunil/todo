const jwt = require("jsonwebtoken");
const JWT_SECRET = "your-secret-key";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
