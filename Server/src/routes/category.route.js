// const express = require('express');
// const router = express.Router();
// const { body } = require('express-validator');
// const authController = require('../controller/auth.controller.js');
// const { isAdmin, isVendor, isCustomer } = require('../middlewares/auth.middleware.js');
// const categoryController = require('../controller/category.controller.js');

// // Public routes
// router.get('/', categoryController.getAllCategories);
// router.get('/:id', categoryController.getCategoryById);

// // Admin-specific routes
// router.post(
//   '/',
//   isAdmin,
//   [
//     body('name').trim().notEmpty().withMessage('Category name is required'),
//     body('slug').trim().notEmpty().withMessage('Category slug is required'),
//   ],
//   categoryController.createCategory
// );

// router.put('/:id', isAdmin, categoryController.updateCategory);

// router.delete('/:id', isAdmin, categoryController.deleteCategory);

// module.exports = router;
