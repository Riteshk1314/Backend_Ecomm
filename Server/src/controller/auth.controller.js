const User = require('../models/user.model');
const { generateTokens, verifyRefreshToken } = require('../utils/token.js');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    // console.log(email);
    // console .log(password);
    // console.log(role);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
    }
    const user = new User({ email, password, role });
        console.log("1");

    const { accessToken, refreshToken } = generateTokens(user);
    // console.log("2");
    user.refreshToken = refreshToken;
    // console.log("3");

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000
    });
    // console.log("4");
    await user.save();
    //     console.log("5");


    res.status(201).json({ user,refreshToken, accessToken });

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log(email);
        // console.log(password);
        // console.log("1");
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: 'Invalid email or password' });

        }

        const { accessToken, refreshToken } = generateTokens(user);

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ refreshToken, accessToken });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const logout = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(400).json({ message: 'No refresh token provided' });
        }

        const user = await User.findOne({ refreshToken });
        if (!user) {
            return res.status(400).json({ message: 'Invalid refresh token' });
        }

        user.refreshToken = null;
        await user.save();

        res.clearCookie('refreshToken');
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        // Fetch users but exclude sensitive information
        const users = await User.find()
            .select('-password -refreshToken') // Exclude sensitive fields
            .lean(); // Convert to plain JavaScript objects for better performance
        
        // Transform the data to only send necessary information
        const sanitizedUsers = users.map(user => ({
            id: user._id,
            email: user.email,
            role: user.role,
            // Add any other non-sensitive fields you want to include
        }));

        res.status(200).json({ users: sanitizedUsers });
    } catch (error) {
        console.error('Get all users error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
const getUser = async (req, res) => {
    try {
        // req.user comes from your auth middleware
        // It should contain the user ID from the JWT token
        const user = await User.findOne(req.email); // Exclude sensitive fields
        
        if (!user) {
            return res.status(404).json({ message: 'User not found.....' });
        }

        res.status(200).json({ 
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                // Add any other fields you want to return
            }
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};




const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(400).json({ message: 'No refresh token provided' });
        }

        const userData = verifyRefreshToken(refreshToken);
        if (!userData) {
            return res.status(400).json({ message: 'Invalid refresh token' });
        }

        const user = await User.findById(userData.userId);
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(400).json({ message: 'Invalid refresh token' });
        }

        const { accessToken, newRefreshToken } = generateTokens(user);

        user.refreshToken = newRefreshToken;
        await user.save();

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ accessToken });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
module.exports = {
    register,
    login,
    logout,refreshToken,
    getAllUsers,getUser
};
