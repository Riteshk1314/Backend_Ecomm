const mongoose= require('mongoose');
const { Schema } = mongoose;
const productSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,

    },
    price:{
        type:Number,
        required:true,
    },
    discountedPrice:{
        type:Number,
        },
    discountPercentage:{
        type:Number,
    },
    quantity:{
        type:Number,
        required:true,
    },
    brand:{
        type:String,
    },
    size:[{
        name:{type:String},
        quantity:{type:Number},
    }],
    color:[{
        name:{type:String},
        quantity:{type:Number},
    }],
    image:{
        type:String,
    },
    rating:{
        type:mongooose.Schema.Types.ObjectId,   
        ref:'Rating'
    },
    reviews:[{
        type:mongooose.Schema.Types.ObjectId,   
        ref:'Review'
    },
],
numRatings:{
    type:Number,
    default:0,
},
category:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,  
},
createdAt:{
    type:Date,
    default:Date.now,
}
});
const product=mongoose.model('Product',productSchema);
module.exports=product;