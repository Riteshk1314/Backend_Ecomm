// const express = require('express');
// const router = express.Router();
// const { body } = require('express-validator');
// const authController = require('../controller/auth.controller.js');
// const { isAdmin, isVendor, isCustomer } = require('../middlewares/auth.middleware.js');
// const vendorController = require('../controller/vendor.controller.js');

// // Public routes
// router.get('/', vendorController.getAllVendors);
// router.get('/:id', vendorController.getVendorById);
// router.get('/:id/products', vendorController.getVendorProducts);

// // Customer can register as a vendor
// router.post(
//   '/register',
//   isCustomer,
//   [
//     body('businessName').trim().notEmpty().withMessage('Business name is required'),
//     body('description').trim().optional(),
//     body('address').isObject().withMessage('Address must be an object'),
//   ],
//   vendorController.registerVendor
// );

// // Vendor can update their profile
// router.put('/profile', isVendor, vendorController.updateVendorProfile);

// // Admin can update vendor status
// router.patch(
//   '/:id/status',
//   isAdmin,
//   [
//     body('status').isIn(['approved', 'rejected']).withMessage('Invalid status, choose between approved or rejected'),
//   ],
//   vendorController.updateVendorStatus
// );

// module.exports = router;
