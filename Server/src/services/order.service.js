const cartService = require('../services/cart.service');
async function createOrder(user,shipAdress){
    let address;
    if(shipAdress._id){
        let existAddress=await Address.findById(shipAdress._id);
        adress=existAddress;
    }
    else{
        address=new Address(shipAdress);
        address.user=user;
        await address.save();
        user.address.push(address);
        await user.save();
    }
    const cart=await cartService.findUserCart(user._id);
    const orderItem=[]; 
    for(let item of cart.cartItems){
        const orderItem=new OrderItem({
            product:item.product,
            quantity:item.quantity,
            price:item.price,
            discountedPrice:item.discountedPrice,
            size:item.size.Address,
            userId:item.userId,
        })
        orderItem.push(orderItemObj);
    }
    const createdOrderItem=await OrderItem.save();
    orderItem.push(createdOrderItem);


const createdOrder=new Order({
    user,
    orderItems,
    totalPrice:cart.totalPrice,
    totalDiscountedPrice:cart.totalDiscountedPrice,
    totalItem:cart.totalItems,
    discount:cart.discount,
    address:address,

}) 

const savedOrder=await createdOrder.save();
return savedOrder;
}


async function placeOrder(orderId){
    const order=await findOrderById(orderId);
    if(!order){
        throw new Error("Order not found");
    }
    order.status="placed";
    order.paymentStatus="completed";
    return order.save();}
async function cancelOrder(orderId){
    const order=await findOrderById(orderId);
    if(!order){
        throw new Error("Order not found");
    }
    order.status="cancelled";
    order.paymentStatus="cancelled";
    return order.save();
}
async function shipOrder(orderId){ 
    const order=await findOrderById(orderId);
    if(!order){
        throw new Error("Order not found");
    }
    order.status="shipped";
    return order.save();
}
async function deliverOrder(orderId){
    const order=await findOrderById(orderId);
    if(!order){
        throw new Error("Order not found");
    }
    order.status="delivered";
    return order.save();
}
async function cancelOrder(orderId){
    const order=await findOrderById(orderId);
    if(!order){
        throw new Error("Order not found");
    }
    order.status="cancelled";
    order.paymentStatus="cancelled";
    return order.save();
}


async function findOrderById(orderId){
    try{
        const order= await Order.findById(orderId).populate("user").populate({path:"orderItems",populate:{path:"product"}}).populate("shippingAddress");

        if(!order){
            throw new Error("Order not found");
        }
        return order;
    }
    catch(error){
        throw error;
    }
}
async function userOrderHistory(userId){
    try{
        const orders= await Order.finf({user:userId,orderStatus:"Placed"}).populate("user").populate({path:"orderItems",populate:{path:"product"}}).populate("shippingAddress");


        if(!orders){
            throw new Error("Order not found");
        }
        return orders;
    }
    catch(error){
        throw error;
    }
}

async function getAllOrders(){
    try{
        const orders= await Order.find().populate("user").populate({path:"orderItems",populate:{path:"product"}}).populate("shippingAddress").lean();

        if(!orders){
            throw new Error("Order not found");
        }
        return orders;
    }
    catch(error){
        throw error;
    }
}
async function deleteOrder(orderId){
    try{
        const order= await Order.findById(orderId);
        if(!order){
            throw new Error("Order not found");
        }
        return order.remove();
    }
    catch(error){
        throw error;
    }
}
module.exports={
    createOrder,
    placeOrder,
    cancelOrder,
    shipOrder,
    deliverOrder,
    findOrderById,
    userOrderHistory,
    getAllOrders,
    deleteOrder,
    cancelOrder
}