import Story from "../../models/storyModel.js";
import CustomError from "../../utilities/customError.js";
import Follow from "../../models/followModel.js";
import User from "../../models/userModel.js";
import { response } from "express";



const postStory = async (req, res, next) => {
    if(!req.file){
        return next(new CustomError("Please upload a file",400))
    }
    const user = await User.findById(req.user.id);
    if (!user) {
        return next(new CustomError("User not found", 404));
    }
    const media= req.uploadedFile.secure_url
    const story= await Story.findOne({ user: req.user.id });
    if (story) {
        await Story.updateOne({ user: req.user.id }, { $push: { media: media } }, { new: true });
        return res.status(200).json({ message: "Story updated successfully", story });
    }
    const newStory = new Story({
        user: req.user.id,
        media:[media],
    })
    await newStory.save();
    res.status(200).json({ message: "Story posted successfully", story: newStory });
};


const getStories = async (req, res, next) => {
    const follow= await Follow.find({$or:[{follower:req.user.id},{following:req.user.id}]});
    if(!follow){
        return res.status(200).json({ stories: [] });
    }
    const isCurrUserHasStory = await Story.findOne({ user: req.user.id });
    const followUsers =await User.find({$or:[{id:follow.follower},{id:follow.following}]}).select("id username profile");
    if (isCurrUserHasStory) {
        followUsers.push({
            _id: req.user.id,
            username: req.user.username,
            profile: req.user.profile,
        });
    }
    res.status(200).json({ stories: followUsers });
}

const getOneStory = async (req, res, next) => {
    const story = await Story.findOne({user:req.params.id});
    if (!story) {
        return next(new CustomError("Story not found", 404));
    }
    res.status(200).json({ story });
};

const likeStory = async (req, res, next) => {
    const story = await Story.findById(req.params.id);
    if (!story) {
        return next(new CustomError("Story not found", 404));
    }
    const isLiked = story.likes.includes(req.user.id);
    if (isLiked) {
        await Story.updateOne({ _id: req.params.id }, { $pull: { likes: req.user.id } });
        res.status(200).json({ message: "Story unliked successfully" });
    } else {
        await Story.updateOne({ _id: req.params.id }, { $push: { likes: req.user.id } });
        res.status(200).json({ message: "Story liked successfully" });
    }
    res.status(200).json({ message: "Story liked successfully" });
};

const addToSeen = async(req,res,next)=>{
    const story=await Story.findById(req.params.id)
    if(!story){
        return next(new CustomError("Story not found", 404));
    }
    await Story.updateOne({ _id: req.params.id }, { $push: { seenBy: req.user.id } });
    res.status(200).json({ message: "Story seen successfully" });
}


export { postStory, getStories ,likeStory, getOneStory,addToSeen};