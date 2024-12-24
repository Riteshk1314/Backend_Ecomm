const express = require('express');
const { body } = require('express-validator');
const authController = require('../controller/auth.controller.js');
const { isAdmin, isVendor, isCustomer } = require('../middlewares/auth.middleware.js'); // Ensure this is correct

const router = express.Router();

// User registration route
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('role').isIn(['customer', 'vendor']).withMessage('Invalid role')
  ],
  authController.register
);

// Login route
router.post('/login', authController.login);

// Token refresh route
router.post('/refresh-token', authController.refreshToken);

// Logout route
router.post('/logout', authController.logout);

// Customer-specific route
router.get('/me', isCustomer, authController.getUser);

// Vendor-specific route
router.get('/vendor/dashboard', isVendor, (req, res) => {
  res.status(200).json({ message: 'Welcome, Vendor!' });
});

// Admin-specific route
router.get('/admin/get-all-users', isAdmin, authController.getAllUsers);

module.exports = router;
