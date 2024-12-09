const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { 
      userId: user._id,
      email: user.email,
      role: user.role 
    },
    "JWT_ACCESS_SECRET",
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { userId: user._id },
    "JWT_REFRESH_SECRET",
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, "JWT_REFRESH_SECRET");
};

module.exports = {
  generateTokens,
  verifyRefreshToken,
};