const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const auth = require('../middleware/auth.middleware');
const categoryController = require('../controllers/category.controller');

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);

router.post('/',
  auth(['admin']),
  [
    body('name').trim().notEmpty(),
    body('slug').trim().notEmpty(),
  ],
  categoryController.createCategory
);

router.put('/:id',
  auth(['admin']),
  categoryController.updateCategory
);

router.delete('/:id',
  auth(['admin']),
  categoryController.deleteCategory
);

module.exports = router;