const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const auth = require('../middlewares/auth.middleware.js');
const brandController = require('../controller/brand.controller.js');

router.get('/', brandController.getAllBrands);
router.get('/:id', brandController.getBrandById);
router.get('/:id/products', brandController.getBrandProducts);

router.post('/',
  auth(['admin']),
  [
    body('name').trim().notEmpty(),
    body('website').optional().isURL(),
  ],
  brandController.createBrand
);

router.put('/:id',
  auth(['admin']),
  brandController.updateBrand
);

router.delete('/:id',
  auth(['admin']),
  brandController.deleteBrand
);

module.exports = router;