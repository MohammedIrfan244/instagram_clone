import Story from "../../models/storyModel";
import CustomError from "../../utilities/customError";
import Follow from "../../models/followModel";
import User from "../../models/userModel";
import { response } from "express";



const postStory = async (req, res, next) => {
    const { media } = req.file;
    const user = await User.findById(req.user.id);
    if (!user) {
        return next(new CustomError("User not found", 404));
    }
    const story= await Story.findOne({ user: req.user.id });
    if (story) {
        await Story.updateOne({ user: req.user.id }, { $push: { media: media } });
    }
    const newStory = new Story({
        user: req.user.id,
        media:[media],
    })
    await newStory.save();
    res.status(200).json({ message: "Story posted successfully", story });
};


const getStories = async (req, res, next) => {
    const follow= await Follow.findMany({$or:[{follower:req.user.id},{following:req.user.id}]});
    if(!follow){
        return res.status(200).json({ stories: [] });
    }
    const isCurrUserHasStory = await Story.findOne({ user: req.user.id });
    const followUsers =await User.find({$or:[{id:follow.follower},{id:follow.following}]}).select("_id","username","profile");
    if (isCurrUserHasStory) {
        followUsers.push({
            _id: req.user.id,
            username: req.user.username,
            profile: req.user.profile,
        });
    }
     response.status(200).json({ stories: followUsers });
}

const getOneStory = async (req, res, next) => {
    const story = await Story.findById({user:req.params.id});
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


export { postStory, getStories ,likeStory, getOneStory };