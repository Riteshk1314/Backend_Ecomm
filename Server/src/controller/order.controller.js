const Order = require('../models/order.model');
const Product = require('../models/product.model');

const createOrder = async (req, res) => {
  try {
    let totalAmount = 0;
    const orderItems = [];

    for (const item of req.body.items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.product} not found` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for product ${product.name}` });
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;
      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price
      });

      product.stock -= item.quantity;
      await product.save();
    }

    const order = new Order({
      user: req.user.userId,
      items: orderItems,
      totalAmount,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId })
      .populate('items.product', 'name price')
      .sort('-createdAt');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getVendorOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      'items.product': { 
        $in: await Product.find({ vendor: req.user.vendorId }).distinct('_id')
      }
    })
      .populate('items.product', 'name price')
      .populate('user', 'email')
      .sort('-createdAt');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'name price')
      .populate('user', 'email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (req.user.role === 'customer' && order.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (req.user.role === 'vendor') {
      const vendorProducts = await Product.find({ vendor: req.user.vendorId }).distinct('_id');
      const hasVendorProduct = order.items.some(item => 
        vendorProducts.includes(item.product._id)
      );
      if (!hasVendorProduct) {
        return res.status(403).json({ message: 'Not authorized' });
      }
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (req.user.role === 'vendor') {
      const vendorProducts = await Product.find({ vendor: req.user.vendorId }).distinct('_id');
      const hasVendorProduct = order.items.some(item => 
        vendorProducts.includes(item.product)
      );
      if (!hasVendorProduct) {
        return res.status(403).json({ message: 'Not authorized' });
      }
    }

    order.status = req.body.status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getVendorOrders,
  getOrderById,
  updateOrderStatus
};