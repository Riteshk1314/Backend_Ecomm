const mongoose= require('mongoose');
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories'
    },
    level:{
        type: Date,
        required: true,
    }
});

const Category= mongoose.model('Category', categorySchema);
module.exports = Category;
