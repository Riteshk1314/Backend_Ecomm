const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: String,
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    url: String,
    alt: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);