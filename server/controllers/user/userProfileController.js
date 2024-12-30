import cloudinary from "../../config/cloudinaryConfig.js";
import User from "../../models/userModel.js";
import CustomError from "../../utilities/customError.js";

const updateUserProfilePicture = async (req, res, next) => {
    if(!req.file){
        return next(new CustomError("Please upload a file",400))
    }
    const user=await User.findById(req.user.id)
    if(!user){
        return next(new CustomError("User not found",404))
    }
    if(user.profile!=="https://i.pinimg.com/736x/20/05/e2/2005e27a39fa5f6d97b2e0a95233b2be.jpg"){
        await cloudinary.uploader.destroy(user.profile)
    }
    user.profile=req.uploadedFile.secure_url
    await user.save()
    res.status(200).json({message:"Profile picture updated successfully",profile:user.profile})
    };
    
    const deleteUserProfilePicture = async (req, res, next) => {
      const user = await User.findById(req.user.id);
      if (!user) {
        return next(new CustomError("User not found", 404));
      }
    
      if (user.profile !== "https://i.pinimg.com/736x/20/05/e2/2005e27a39fa5f6d97b2e0a95233b2be.jpg") {
        await cloudinary.uploader.destroy(user.profile);
      }
    
      user.profile = "https://i.pinimg.com/736x/20/05/e2/2005e27a39fa5f6d97b2e0a95233b2be.jpg";
      await user.save();
    
      res.status(200).json({ message: "Profile picture deleted successfully",profile:user.profile });
    };

    const userUpdate=async (req,res,next)=>{
      const {bio,gender}=req.body
      console.log(bio,gender)
      if(!bio||!gender){
        return next(new CustomError("Please provide bio and gender",400))
      }
      const user=await User.findByIdAndUpdate(req.user.id,{bio,gender},{new:true})
      const userDetail={fullname:user.fullname,username:user.username,profile:user.profile,email:user.email,bio:user.bio,gender:user.gender ,_id:user._id}
      res.status(200).json({message:"Profile updated successfully",userDetail})
    }

    export {updateUserProfilePicture,deleteUserProfilePicture,userUpdate}