const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('../controller/auth.controller.js');
const auth = require('../middlewares/auth.middleware.js');
router.post('/register',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('role').isIn(['customer', 'vendor']),
  ],
  authController.register
);

router.post('/login',authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logout);
router.get('/me', auth(), authController.getAllUsers);
module.exports = router;
