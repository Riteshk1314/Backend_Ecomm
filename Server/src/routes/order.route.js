// const express = require('express');
// const router = express.Router();
// const { body } = require('express-validator');const authController = require('../controller/auth.controller.js');
// const { isAdmin, isVendor, isCustomer } = require('../middlewares/auth.middleware.js');
// const orderController = require('../controller/order.controller.js');

// // Customer-specific route to create an order
// router.post(
//   '/',
//   isCustomer,
//   [
//     body('items').isArray().withMessage('Items should be an array'),
//     body('items.*.product').notEmpty().withMessage('Product ID is required for each item'),
//     body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
//     body('shippingAddress').isObject().withMessage('Shipping address must be an object'),
//     body('paymentMethod').notEmpty().withMessage('Payment method is required'),
//   ],
//   orderController.createOrder
// );

// // Customer-specific route to view their orders
// router.get('/my-orders', isCustomer, orderController.getUserOrders);

// // Vendor-specific route to view orders associated with their products
// router.get('/vendor-orders', isVendor, orderController.getVendorOrders);

// // All roles (customer, vendor, admin) can view order details
// router.get('/:id', isCustomer || isVendor || isAdmin, orderController.getOrderById);

// // Vendor and Admin-specific route to update order status
// router.patch(
//   '/:id/status',
//   isVendor || isAdmin,
//   [
//     body('status').isIn(['processing', 'shipped', 'delivered', 'cancelled']).withMessage('Invalid order status'),
//   ],
//   orderController.updateOrderStatus
// );

// module.exports = router;
