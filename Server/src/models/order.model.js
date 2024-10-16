const mongoose = require('mongoose');
const { default: orders } = require('razorpay/dist/types/orders');
const { Schema } = mongoose;
const orderSchema = new Schema({
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'

    },
    orderItems: [{ 
        type: Schema.Types.ObjectId,
        ref: 'OrderItems'
    }],
    OrderDate: {
        type: Date,
        default: Date.now
    },
    orderStatus: {
        type: String,
        default: "Pending",
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    totalItems: {
        type: Number,
        required: true,
    },
    totalDiscountedPrice: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    deliverDate: { 
        type: Date,
        required: true,
    },
    shippingAddress: {
        type: Schema.Types.ObjectId,
        ref: 'Address'
    },


    paymentDetails:{


    paymentMethod:{
        type: String,
        required: true,
    },
    paymentStatus:{
        type: String,
        default: "Pending",
    },
    transactionId:{
        type: String,
        required: true,
    },
    },
});

const Order= Mongoose.model('Order', orderSchema);
module.exports = Order;