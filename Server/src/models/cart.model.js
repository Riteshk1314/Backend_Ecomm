const mongoose=require('mongoose');
const cartSchema = new mongoose.Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    totalPrice:{
        type: Number,
        required: true,
    },
    totalItems:{
        type: Number,
        required: true,
    },
    totalDiscountedPrice:{
        type: Number,
        required: true,
    },
    discount:{
        type: Number,
        required: true,
    },

});