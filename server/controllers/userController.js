import User from "../models/userModel";
import CustomError from "../utilities/customError";

const getOneUser = async (req, res,next) => {
 const user=await User.findById(req.params.username)
    if(!user){
        return next(new CustomError("User not found",404))
    }
    res.status(200).json(user)
}

const getUsersByUsername = async (req, res,next) => {
    const users=await User.find({username:{$regex:req.params.username,$options:"i"}})
    if(users.length===0){
        return res.status(200).json({users:[],message:"No user found"})
    }
    res.status(200).json(users)
}

export {getOneUser,getUsersByUsername}