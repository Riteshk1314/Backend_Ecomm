const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const auth = require('../middlewares/auth.middleware.js');
const orderController = require('../controller/order.controller.js');

router.post('/',
  auth(['customer']),
  [
    body('items').isArray(),
    body('items.*.product').notEmpty(),
    body('items.*.quantity').isInt({ min: 1 }),
    body('shippingAddress').isObject(),
    body('paymentMethod').notEmpty(),
  ],
  orderController.createOrder
);

router.get('/my-orders',
  auth(['customer']),
  orderController.getUserOrders
);

router.get('/vendor-orders',
  auth(['vendor']),
  orderController.getVendorOrders
);

router.get('/:id',
  auth(['customer', 'vendor', 'admin']),
  orderController.getOrderById
);

router.patch('/:id/status',
  auth(['vendor', 'admin']),
  [
    body('status').isIn(['processing', 'shipped', 'delivered', 'cancelled']),
  ],
  orderController.updateOrderStatus
);

module.exports = router;