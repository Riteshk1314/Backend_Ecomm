
const userService=require('../services/user.service');
const getUserProfile=async(req,res)=>{
    try {
        const jwtToken=req.headers.authorization?.split(' ')[1];//[Bearer,token]
        if(!jwtToken){
            return res.status(401).json({message:'Unauthorized'});
        }
            const user=await userService.getUserProfileByToken(jwtToken);
            return res.status(200).json({user,message:'User profile fetched successfully'});
    }
    catch(error){
        return res.status(400).json({error:error.message});
    }
}

const getAllUsers=async(req,res)=>{
    try{
        const users=await userService.getAllUsers();
        return res.status(200).json({users,message:'Users fetched successfully'});
    }
    catch(error){
        return res.status(400).json({error:error.message});
    }
}
module.exports={getUserProfile,getAllUsers};