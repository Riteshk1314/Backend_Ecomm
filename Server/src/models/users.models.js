const mongoose= require('mongoose');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    address: [{
        type:mongooose.Schema.Types.ObjectId,
        ref: 'Address'

    }],
    payemntInformation: [{
        type:mongooose.Schema.Types.ObjectId,
        ref: 'PaymentInformation'

    }],
    cart: {
        type: mongooose.Schema.Types.ObjectId,
        ref: 'Cart'
    },
    ratings: [{
        type: mongooose.Schema.Types.ObjectId,
        ref: 'Rating'
    }],
    reviews: [{
        type: mongooose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    createdAt:{
        type: Date,
        default: Date.now
    }

});
const User= mongoose.mongo('User', userSchema);
module.exports= User;