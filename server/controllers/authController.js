import { joiUserSchema } from "../models/joiSchema.js"
import User from "../models/userModel.js"
import CustomError from '../utilities/customError.js'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'



const userRegister = async (req, res,next) => {
    const {value,error}=joiUserSchema.validate(req.body)
    if(error){
        return next(new CustomError(error.message,400))
    }
    const {fullname,username,email,password}=value
    const emailExist=await User.findOne({email})
    if(emailExist){
        return next(new CustomError("Email already in use",400))
    }
    const usernameExist=await User.findOne({username})
    if(usernameExist){
        return next(new CustomError("Username already in use",400))
    }
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)
    const fallBackProfile="https://i.pinimg.com/736x/20/05/e2/2005e27a39fa5f6d97b2e0a95233b2be.jpg"
    const user = new User({
        fullname,
        username,
        email,
        password:hashedPassword,
        profile:fallBackProfile
    })
    await user.save()
    res.status(201).json({message:"User registered successfully"})
}

const userLogin = async (req, res,next) => {
    const {identity,password}=req.body
    const user=await User.findOne({email:identity}) || await User.findOne({username:identity})
    if(!user){
        return next(new CustomError("Invalid credentials",400))
    }
    const validPassword=await bcrypt.compare(password,user.password)
    if(!validPassword){
        return next(new CustomError("Invalid credentials",400))
    }
    const accessToken=jwt.sign({id:user._id},process.env.JWT_TOKEN,{expiresIn:"1d"})
    const refreshToken=jwt.sign({id:user._id},process.env.JWT_REFRESH_TOKEN,{expiresIn:"7d"})
    const userDetail={_id:user._id,fullname:user.fullname,username:user.username,email:user.email,profile:user.profile}
    res.cookie("refreshToken",refreshToken,{httpOnly:true,secure:true,sameSite:"none"})
    res.status(200).json({message:"Login successful",accessToken,userDetail})
}


export { userRegister, userLogin }