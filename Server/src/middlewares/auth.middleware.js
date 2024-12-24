const jwt = require('jsonwebtoken');

// Role validation middleware function
const roleValidator = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
      }
      console.log("1");
      const token = authHeader.split(' ')[1];
      console.log("2");
      const decoded = jwt.verify(token,"JWT_ACCESS_SECRET");
      console.log(decoded);
      req.user = decoded;

      // Check if the user's role matches the required role
      if (req.user.role !== requiredRole) {
        return res.status(403).json({ message: `Forbidden: ${requiredRole} access required` });
      }
      console.log("3");
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
      }
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};

// Export role-specific middlewares
const isAdmin = roleValidator('admin');
const isVendor = roleValidator('vendor');
const isCustomer = roleValidator('customer');

module.exports = {
  isAdmin,
  isVendor,
  isCustomer,
};
