// const express = require('express');
// const router = express.Router();
// const { body } = require('express-validator');
// const authController = require('../controller/auth.controller.js');
// const { isAdmin, isVendor, isCustomer } = require('../middlewares/auth.middleware.js');
// const brandController = require('../controller/brand.controller.js');

// // Public routes to view all brands, view a brand by ID, and view products of a brand
// router.get('/', brandController.getAllBrands);
// router.get('/:id', brandController.getBrandById);
// router.get('/:id/products', brandController.getBrandProducts);

// // Admin-specific routes
// router.post(
//   '/',
//   isAdmin,
//   [
//     body('name').trim().notEmpty().withMessage('Brand name is required'),
//     body('website').optional().isURL().withMessage('Invalid website URL'),
//   ],
//   brandController.createBrand
// );

// router.put('/:id', isAdmin, brandController.updateBrand);

// router.delete('/:id', isAdmin, brandController.deleteBrand);

// module.exports = router;
