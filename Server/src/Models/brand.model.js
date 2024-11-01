const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: String,
  logo: {
    url: String,
    alt: String
  },
  website: String
}, { timestamps: true });

module.exports = mongoose.model('Brand', brandSchema);