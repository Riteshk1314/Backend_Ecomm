const Vendor = require('../models/vendor.model.js');
const User = require('../models/user.model.js');
const Product = require('../models/product.model.js');

const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find()
      .populate('user', 'email')
      .select('-__v');
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id)
      .populate('user', 'email')
      .select('-__v');
    
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const registerVendor = async (req, res) => {
  try {
    const existingVendor = await Vendor.findOne({ user: req.user.userId });
    if (existingVendor) {
      return res.status(400).json({ message: 'User is already a vendor' });
    }

    await User.findByIdAndUpdate(req.user.userId, { role: 'vendor' });

    const vendor = new Vendor({
      user: req.user.userId,
      businessName: req.body.businessName,
      description: req.body.description,
      address: req.body.address
    });

    await vendor.save();
    res.status(201).json(vendor);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateVendorProfile = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ user: req.user.userId });
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor profile not found' });
    }

    Object.assign(vendor, req.body);
    await vendor.save();
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getVendorProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || '-createdAt';

    const products = await Product.find({ 
      vendor: req.params.id,
      status: 'published'
    })
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('category', 'name')
      .populate('brand', 'name');

    const total = await Product.countDocuments({ 
      vendor: req.params.id,
      status: 'published'
    });

    res.json({
      products,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalProducts: total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateVendorStatus = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    vendor.status = req.body.status;
    await vendor.save();
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllVendors,
  getVendorById,
  registerVendor,
  updateVendorProfile,
  getVendorProducts,
  updateVendorStatus
};