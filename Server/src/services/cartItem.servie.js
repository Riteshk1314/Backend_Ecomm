const userService= require("../services/user.service.js")


async function updateCartItem(userId, cartItemId,CartItemData){
    try{
        const item= await findCartItemById(cartItemId);
        if(!item){
            throw new Error("Item not found")
        }
        const user = await userService.findUserById(userId);
        if(!user){
            throw new Error("User not found")
        }
        if(user._id.toString()==userId.toString()){
            item.quantity=CartItemData.quantity;
            item.price=item.quantity*item.product.price;
            item.discountedPrice=item.quantity*item.product.discountedPrice;
            const updatedCartItem=await item.save();
            
            return updatedCartItem;
        }   
        else{
            throw new Error("You cant update this cart item");
        }
    }
        catch(error){
            throw error;

        }

    }
async function removeCartItem(userId, cartItemId){
    try{
        const cartItem= await findCartItemById(cartItemId);
        if(!item){
            throw new Error("Item not found")
        }

        const user = await userService.findUserById(userId);
        if(!user){
            throw new Error("User not found")
        }

        if(user._id.toString()==cartItem.userId.toString()){
            await cartItem.findIdAndDelete(cartItemId);
            return item;
        }   
        else{
            throw new Error("You cant delete this cart item");
        }
    }
        catch(error){
            throw error;

        }
    }
async function findCartItemById(cartItemId){
    try{
        const cartItem= await CartItem.findById(cartItemId);
        if(!cartItem){
            throw new Error("Cart item not found");
        }
        return cartItem;
    }
    catch(error){
        throw error;
    }
}
module.exports={
    updateCartItem,
    removeCartItem,
    findCartItemById,
}