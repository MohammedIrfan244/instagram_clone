import { joiUserSchema } from "../models/joiSchema.js"
import Otp from "../models/otpModel.js"
import User from "../models/userModel.js"
import CustomError from '../utilities/customError.js'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import passport from 'passport'
import generateOTP from "../utilities/otpGenerator.js"
import transporter from "../config/nodemailerConfig.js"



// const userRegister = async (req, res,next) => {
//     const {value,error}=joiUserSchema.validate(req.body)
//     if(error){
//         return next(new CustomError(error.message,400))
//     }
//     const {fullname,username,email,password}=value
//     const emailExist=await User.findOne({email})
//     if(emailExist){
//         return next(new CustomError("Email already in use",400))
//     }
//     const usernameExist=await User.findOne({username})
//     if(usernameExist){
//         return next(new CustomError("Username already in use",400))
//     }
//     console.log(value)
//     const salt=await bcrypt.genSalt(10)
//     const hashedPassword=await bcrypt.hash(password,salt)
//     const fallBackProfile="https://i.pinimg.com/736x/20/05/e2/2005e27a39fa5f6d97b2e0a95233b2be.jpg"
//     const user = new User({
//         fullname,
//         username,
//         email,
//         password:hashedPassword,
//         profile:fallBackProfile
//     })
//     await user.save()
//     res.status(201).json({message:"User registered successfully"})
// }
const sendOtp = async (req, res, next) => {
  const { email, username } = req.body;
  const existingEmail = await User.findOne({ email });
  const existingUsername = await User.findOne({ username });
  if (existingEmail || existingUsername) {
    return next(new CustomError("User already exist", 400));
  }
  const otp = generateOTP();
  const otpEntry = new Otp({
    email,
    otp,
  });
  await otpEntry.save();

  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: email,
    subject: "OTP Verification",
    text: `Your OTP is ${otp}`,
  };
  await transporter.sendMail(mailOptions);

  res.status(200).json({ message: "OTP sent successfully to the email" });
};

const verifyOtpAndRegister = async (req, res, next) => {
  const { value, error } = joiUserSchema.validate(req.body);
  if (error) {
    return next(new CustomError(error.message, 400));
  }
  const { email, otp, username, password ,fullname} = value;
  const otpEntry = await Otp.findOne({ email, otp });
  if (!otpEntry) {
    Otp.deleteMany({ email });
    return next(new CustomError("Invalid OTP", 400));
  }
  Otp.deleteMany({ email });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    email,
    fullname,
    username,
    password: hashedPassword,
  });
  await user.save();
  res.status(201).json({ message: "User registered successfully" });
};

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
    const userDetail={fullname:user.fullname,username:user.username,profile:user.profile,email:user.email,bio:user.bio,gender:user.gender ,_id:user._id}
    res.cookie("accessToken",accessToken,{httpOnly:false,secure:true,sameSite:"none"})
    res.cookie("refreshToken",refreshToken,{httpOnly:true,secure:true,sameSite:"none"})
    res.status(200).json({message:"Login successful",userDetail})
}

const userLogout = async (req, res) => {
    res.clearCookie("refreshToken")
    res.clearCookie("accessToken")
    res.status(200).json({message:"logged out"})
}


const refreshingToken = async (req, res, next) => {
    if (!req.cookies) {
      return next(new CustomError("No cookies found", 401));
    }
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return next(new CustomError("No refresh token found", 401));
    }
  
  
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);
  
    if (!decoded) {
      return next(new CustomError("Invalid refresh token", 401));
    }
  
  
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new CustomError("User not found", 404));
    }
  
   
  let accessToken = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "1d",
    });
  res.cookie("accessToken", accessToken, {
    httpOnly: false,
    secure: true,
    sameSite: "none",
  })
    res.status(200).json({ message: "Token refreshed"});
  };


  const facebookLogin=passport.authenticate('facebook',{scope:'email'})

  const facebookCallback=passport.authenticate('facebook',{failureRedirect:'/user/login',successRedirect:'/'})

export { sendOtp, verifyOtpAndRegister, userLogin, userLogout ,refreshingToken,facebookLogin,facebookCallback}