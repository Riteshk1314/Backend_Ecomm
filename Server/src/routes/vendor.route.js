const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const auth = require('../middlewares/auth.middleware.js');
const vendorController = require('../controller/vendor.controller.js');

router.get('/', vendorController.getAllVendors);
router.get('/:id', vendorController.getVendorById);
router.get('/:id/products', vendorController.getVendorProducts);

router.post('/register',
  auth(['customer']),
  [
    body('businessName').trim().notEmpty(),
    body('description').trim().optional(),
    body('address').isObject(),
  ],
  vendorController.registerVendor
);

router.put('/profile',
  auth(['vendor']),
  vendorController.updateVendorProfile
);

router.patch('/:id/status',
  auth(['admin']),
  [
    body('status').isIn(['approved', 'rejected']),
  ],
  vendorController.updateVendorStatus
);

module.exports = router;