const mongoose = require('mongoose');
const { Carousel } = require('react-responsive-carousel');
const{Schema}=mongoose;
const reviewSchema = new Schema({
    product:{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    review:{
        type: String,
        required: true,
    },
    UserId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    CreatedAt:{
        type: Date,
        default: Date.now   
    }
});