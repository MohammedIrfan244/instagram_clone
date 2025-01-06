import Follow from "../../models/followModel.js";
import User from "../../models/userModel.js";
import Like from "../../models/likeModel.js";
import Comment from '../../models/commentModel.js';
import Post from "../../models/postModel.js";
import CustomError from "../../utilities/customError.js";

const getOneUser = async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username });
  if (!user) {
    return next(new CustomError("User not found", 404));
  }
  const userDetail = {
    _id: user._id,
    fullname: user.fullname,
    username: user.username,
    profile: user.profile,
    bio: user.bio,
    gender: user.gender,
    email: user.email,
  };
  res.status(200).json({ user: userDetail });
};

const getUsersByUsername = async (req, res, next) => {
  const users = await User.find({
    $or: [
      { username: { $regex: req.params.username, $options: "i" } },
      { fullname: { $regex: req.params.username, $options: "i" } },
    ],
  },
  { username: 1, fullname: 1, profile: 1 });
  if (users.length === 0) {
    return res.status(200).json({ users: [], message: "No user found" });
  }
  res.status(200).json(users);
};

const suggestedUsers = async (req, res, next) => {

    const followings = await Follow.find({ follower: req.user.id }).select('following');
    if (followings.length === 0) {
      return res.status(200).json({ suggestedUsers: [] });
    }

    const followingIds = followings.map(f => f.following.toString());

    const followingsFollowings = await Follow.find({
      follower: { $in: followingIds },
    }).select('following');

    if (followingsFollowings.length === 0) {
      return res.status(200).json({ suggestedUsers: [] });
    }

    const suggestedUserIds = followingsFollowings.map(f => f.following.toString());

    const excludedUsers = [...followingIds, req.user.id.toString()];
    const uniqueSuggestedUserIds = [...new Set(suggestedUserIds)].filter(
      userId => !excludedUsers.includes(userId)
    );

    const suggestedUsers = await User.find({ _id: { $in: uniqueSuggestedUserIds } })
      .select('username fullname profile')
      .limit(5);

    res.status(200).json({ suggestedUsers });
};

const getLikedPosts = async (req, res, next) => {
  const likedPosts = await Like.find({ user: req.user.id }).populate('post');
  if (likedPosts.length === 0) {
    return res.status(200).json({ posts: [], message: "No liked posts found" });
  }
  res.status(200).json({ posts: likedPosts });
}

const getCommentedPosts = async (req, res, next) => {
  const commentedPosts = await Comment.find({ user: req.user.id }).populate('post');
  if (commentedPosts.length === 0) {
    return res.status(200).json({ posts: [], message: "No commented posts found" });
  }
  res.status(200).json({ posts: commentedPosts });
} 


export { getOneUser, getUsersByUsername, suggestedUsers, getLikedPosts, getCommentedPosts };