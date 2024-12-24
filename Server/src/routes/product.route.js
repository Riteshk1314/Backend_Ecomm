const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controller/auth.controller.js');
const { isAdmin, isVendor, isCustomer } = require('../middlewares/auth.middleware.js');
const productController = require('../controller/product.controller.js');

// Public routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Vendor-specific routes
router.post(
  '/add',
  isVendor,
  [
    body('name').trim().notEmpty().withMessage('Product name is required'),
    body('description').trim().notEmpty().withMessage('Product description is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('category').notEmpty().withMessage('Category is required'),
    body('brand').notEmpty().withMessage('Brand is required'),
    body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  ],
  productController.createProduct
);

router.put('/:id', isVendor, productController.updateProduct);
router.delete('/:id', isVendor, productController.deleteProduct);

// Customer-specific routes
router.post(
  '/:id/ratings',
  isCustomer,
  [
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('review').trim().optional(),
  ],
  productController.addProductRating
);

module.exports = router;
