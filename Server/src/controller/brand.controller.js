const Brand = require('../models/brand.model.js');
const Product = require('../models/product.model.js');

const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }
    res.json(brand);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getBrandProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || '-createdAt';

    const products = await Product.find({ 
      brand: req.params.id,
      status: 'published'
    })
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('category', 'name')
      .populate('vendor', 'businessName')
      .populate('brand', 'name');

    const total = await Product.countDocuments({ 
      brand: req.params.id,
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

const createBrand = async (req, res) => {
  try {
    const brand = new Brand(req.body);
    await brand.save();
    res.status(201).json(brand);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Brand already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

const updateBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    res.json(brand);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Brand already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const productsCount = await Product.countDocuments({ brand: req.params.id });
    if (productsCount > 0) {
      return res.status(400).json({ message: 'Cannot delete brand with existing products' });
    }

    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    res.json({ message: 'Brand deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllBrands,
  getBrandById,
  getBrandProducts,
  createBrand,
  updateBrand,
  deleteBrand
};