const { gapSize } = require('three/examples/jsm/nodes/Nodes.js');
const Cart=require('../models/cart.model');
const { create } = require('../models/product.model');
const { add } = require('three/webgpu');
async function  createCart(user){
    try{
        const cart=await Cart.create({user});
        cart.save();
        return cart;
    }
    catch(error){
        throw new Error(error);
    }

    
}
async function findUserCart(userId){
    try{
        let cart=await Cart.findOne({user:userId});
        let cartItems = await CartItem.find({cart:cart._id}).populate('product');
        cart.cartItems = cartItems;
        let total=0;
        let totalDiscountedPrice=0;
        let totalItem=0;
        for(let item of cartItems){
            total+=item.price;
            totalDiscountedPrice+=item.discountedPrice;
            totalItem+=item.quantity;
        } 
        cart.totalPrice=total;
        cart.totalDiscountedPrice=totalDiscountedPrice;
        cart.totalItems=totalItem;
        cart.save();
        if(!cart){
            throw new Error('Cart not found',userId);
        }
        return cart;
    }
    catch(error){
        throw new Error(error);
    }
}
async function addItemToCart(userId,req){
    try{
        let cart=await Cart.findOne({user:userId});
        const product = await Product.findOne({req.productId});
        const isPresent=await CartItem.findOne({cart:cart._id,product:productId,userId:userId});
        if(isPresent){
            isPresent.quantity+=1;
            isPresent.save();
            return isPresent;
        }
        if(!isPresent){
            const cartItem=await CartItem.create({
                product:product._id,
                quantity:1,
                price:product.price,
                discountedPrice:product.discountedPrice,
                userId:userId,
                size:req.size});
            cartItem.save();
            return cartItem;
        }
        const createdCartItem=await CartItem.save();
        cart.cartItem.push(createdCartItem);
        cart.save();
        return "Item added to cart";
    }
    catch(error){
        throw new Error(error);
    }
}
module.exports={createCart,addItemToCart,findUserCart};
