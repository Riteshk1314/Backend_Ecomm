const mongoose=require('mongoose');
const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    city: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    state: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    country: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    zipCode: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    mobile:{
        type: String,
        required: true,
    }

});
const Address=mongoose.model('Address',addressSchema);