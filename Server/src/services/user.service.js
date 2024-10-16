const User=require('../models/user.model');
const bcrypt=require('bcrypt');
const jwtprovide=require('../config/jwt.js');
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
        const userId=await jwtprovide.getUserIdByToken(token);
        const user=await findUserById(userId);
        if(!user){
            throw new Error('User not found',userId);
        }
        return user;
    }
    catch(error){
        throw new Error(error);
    }
}
const getAllUsers=async()=>{
    try{
        const users=await User.find({});
        if(!users){
            throw new Error('Users not found');
        }
        return users;
    }
    catch(error){
        throw new Error(error);
    }
}
module.exports={createUser,findUserById,findUserByEmail};
