const mongoose= require('mongoose');
const {Schema}=mongoose;
const ratingSchema = new Schema({
    product:{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    rating:{
        type: Number,
        required: true,
    },
    UserId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});
const Rating = mongoose.model('Rating', ratingSchema);
module.exports=Rating;