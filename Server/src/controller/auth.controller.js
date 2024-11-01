const User = require('../models/user.model');
const { generateTokens, verifyRefreshToken } = require('../utils/tokens');

const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ email, password, role });
    await user.save();

    const { accessToken, refreshToken } = generateTokens(user);
    
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}


        