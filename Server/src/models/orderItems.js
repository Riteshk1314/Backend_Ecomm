const mongoose= require('mongoose');
const { Schema } = mongoose;
const orderItemsSchema = new Schema({
    product:{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    size:{
        type: String,
    },
    quantity:{
        type: Number,
        required: true,
    },
    price:{
        type: Number,
        required: true, 
    },
    discountedPrice:{
        type: Number,
        required: true,
    },
    UserId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});
module.exports = mongoose.model('OrderItems', orderItemsSchema);
module.exports = OrderItems;