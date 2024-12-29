import User from "../../models/userModel.js";
import Follow from "../../models/followModel.js";
import CustomError from "../../utilities/customError.js";


const followUser = async (req, res, next) => {
        const { followingId } = req.body;
        const follower = await User.findById(req.user.id);
        const following = await User.findById(followingId);
        if (!follower || !following) {
            return next(new CustomError("User not found", 404));
        }
        const follow = new Follow({
            follower: req.user.id,
            following: followingId,
        });
        await follow.save();
        res.status(200).json({ message: "User followed successfully" });
};

const unfollowUser = async (req, res, next) => {
        const { followingId } = req.body;
        const follower = await User.findById(req.user.id);
        const following = await User.findById(followingId);
        if (!follower || !following) {
            return next(new CustomError("User not found", 404));
        }
        await Follow.deleteOne({ follower: req.user.id, following: followingId });
        res.status(200).json({ message: "User unfollowed successfully" });
};

export { followUser, unfollowUser };