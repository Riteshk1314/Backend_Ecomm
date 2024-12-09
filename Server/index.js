const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const productRoutes = require('./src/routes/product.route.js');
const categoryRoutes = require('./src/routes/category.route.js');
const vendorRoutes = require('./src/routes/vendor.route.js');
const orderRoutes = require('./src/routes/order.route.js');
const brandRoutes = require('./src/routes/brand.route.js');
const authRoutes = require('./src/routes/auth.routes.js');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/brands', brandRoutes);

// Database connection
mongoose.connect('mongodb+srv://rkapoorbe23:La1YcgqAGSHLK7XL@blumi.r2bw9.mongodb.net/?retryWrites=true&w=majority&appName=Blumi')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});







