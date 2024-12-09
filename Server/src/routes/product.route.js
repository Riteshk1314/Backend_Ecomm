const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const auth = require('../middlewares/auth.middleware.js');
const productController = require('../controller/product.controller.js');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

router.post('/add',
  auth(['vendor']),
  [
    body('name').trim().notEmpty(),
    body('description').trim().notEmpty(),
    body('price').isFloat({ min: 0 }),
    body('category').notEmpty(),
    body('brand').notEmpty(),
    body('stock').isInt({ min: 0 }),
  ],
  productController.createProduct
);

router.put('/:id',
  auth(['vendor']),
  productController.updateProduct
);

router.delete('/:id',
  auth(['vendor']),
  productController.deleteProduct
);

router.post('/:id/ratings',
  auth(['customer']),
  [
    body('rating').isInt({ min: 1, max: 5 }),
    body('review').trim().optional(),
  ],
  productController.addProductRating
);

module.exports = router;