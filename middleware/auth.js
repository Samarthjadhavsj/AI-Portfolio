const jwt = require('jsonwebtoken');

// Verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// Generate JWT token
const generateToken = (admin) => {
  return jwt.sign(
    { 
      id: admin._id, 
      email: admin.email,
      role: admin.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Generate refresh token
const generateRefreshToken = (admin) => {
  return jwt.sign(
    { id: admin._id },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

module.exports = {
  authenticateToken,
  generateToken,
  generateRefreshToken
};
