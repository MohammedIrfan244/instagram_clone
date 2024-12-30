import User from "../../models/userModel.js";
import Follow from "../../models/followModel.js";
import CustomError from "../../utilities/customError.js";


const followToggle=async (req,res,next)=>{
    const { followingId } = req.body;
    const follower = await User.findById(req.user.id);
    const following = await User.findById(followingId);
    if (!follower || !following) {
        return next(new CustomError("User not found", 404));
    }
    const follow = await Follow.findOne({ follower: req.user.id, following: followingId });
    if (follow) {
        await Follow.deleteOne({ follower: req.user.id, following: followingId });
        res.status(200).json({ message: "User unfollowed successfully" });
    } else {
        const follow = new Follow({
            follower: req.user.id,
            following: followingId,
        });
        await follow.save();
        res.status(200).json({ message: "User followed successfully" });
    }
}

const removeFollower = async (req, res, next) => {
    const follower = await User.findById(req.params.id);
    const following = await User.findById(req.user.id);
    if (!follower || !following) {
        return next(new CustomError("User not found", 404));
    }
    await Follow.deleteOne({ follower: req.params.id, following: req.user.id });
    res.status(200).json({ message: "Follower removed successfully" });
};

const getFollowerList = async (req, res, next) => {
    const followers = await Follow.find({ following: req.params.id }).populate("follower", "username profile fullname");
    if(followers.length===0){
        return res.status(200).json({ followers: [], message: "No followers found" });
    }
    res.status(200).json({ followers });
};

const getFollowingList = async (req, res, next) => {
    const following = await Follow.find({ follower: req.params.id }).populate("following", "username profile fullname");
    if(following.length===0){
        return res.status(200).json({ following: [], message: "No following found" });
    }
    res.status(200).json({ following });
};

const getFollowCount = async (req, res, next) => {
    const followerCount = await Follow.countDocuments({ following: req.params.id });
    const followingCount = await Follow.countDocuments({ follower: req.params.id });
    res.status(200).json({ followerCount, followingCount });
};

const getFollowStatus = async (req, res, next) => {
    const follow = await Follow.findOne({ follower: req.user.id, following: req.params.id });
    if (follow) {
        res.status(200).json({ isFollowing: true });
    } else {
        res.status(200).json({ isFollowing: false });
    }
};

export { followToggle , getFollowerList , getFollowingList, removeFollower, getFollowCount, getFollowStatus};