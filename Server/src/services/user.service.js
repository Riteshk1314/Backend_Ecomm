const User=require('../models/user.model');
const bcrypt=require('bcrypt');
const createUser=async (userData)=>{
    try{
        let {firstName,lastName,email,password}=userData;
        const isUserExist=await User.findOne({email});
        if(isUserExist){
            throw new Error('User already exist');
        }
        password=await bcrypt.hash(password,10);
        const user= await User.create({firstName,lastName,email,password});
        return
    }catch(error){
        throw new Error(error);
    }
}
const findUserById=async(UserId)=>{
    try{
        const user=await User.findOne({UserId});
        if(!user){
            throw new Error('User not found',userId);
        }
        return user;
    }
    catch(error){
        throw new Error(error);
    }
}
const findUserByEmail=async(email)=>{
    try{
        const user=await User.findOne({email});
        if(!user){
            throw new Error('User not found',email);
        }
        return user;
    }
    catch(error){
        throw new Error(error);
    }
}
const getUserProfileByToken=async(token)=>{
    try{
        const user=await
module.exports={createUser,findUserById,findUserByEmail};