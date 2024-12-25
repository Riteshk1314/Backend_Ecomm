const Product = require('../models/product.model.js');
const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || '-createdAt';
    const { category, brand, vendor, minPrice, maxPrice, search } = req.query;

    const query = { status: 'published' };
    if (category) query.category = mongoose.Types.ObjectId(category);
    if (brand) query.brand = mongoose.Types.ObjectId(brand);
    if (vendor) query.vendor = mongoose.Types.ObjectId(vendor);
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const products = await Product.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('category', 'name')
      .populate('vendor', 'businessName')
      .populate('brand', 'name');

    const total = await Product.countDocuments(query);

    res.json({
      products,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalProducts: total
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name')
      .populate('vendor', 'businessName')
      .populate('brand', 'name')
      .populate('ratings.user', 'email');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const createProduct = async (req, res) => {
  try {
    console.log("req.user:", req.user); // Log user details
    console.log("Parsed req.body:", req.body); // Log request body

    if (!req.user || !req.user.userId) {
      return res.status(400).json({ message: 'Vendor information is missing or invalid' });
    }

    const product = new Product({
      ...req.body,
      vendor: req.user.userId, // Ensure this field is populated correctly
    });

    console.log("Creating product:", product); // Log product details
    await product.save();

    res.status(201).json(product); // Successfully created
  } catch (error) {
    console.error("Error creating product:", error); // Log error details
    res.status(500).json({ message: 'Server error', error: error.message }); // Return error response
  }
};
const updateProduct = async (req, res) => {
  try {
    const { category, brand, ...updateFields } = req.body;

    if (category) updateFields.category = mongoose.Types.ObjectId(category);
    if (brand) updateFields.brand = mongoose.Types.ObjectId(brand);

    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, vendor: req.user.vendorId },
      updateFields,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      vendor: req.user.vendorId
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const addProductRating = async (req, res) => {
  try {
    const { rating, review } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const existingRating = product.ratings.find(
      (r) => r.user.toString() === req.user.userId
    );

    if (existingRating) {
      return res.status(400).json({ message: 'You have already rated this product' });
    }

    product.ratings.push({
      user: req.user.userId,
      rating,
      review,
    });

    const totalRatings = product.ratings.reduce((sum, item) => sum + item.rating, 0);
    product.averageRating = totalRatings / product.ratings.length;

    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.error('Error adding rating:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addProductRating
};
