import Post from "../../models/postModel.js";
import User from "../../models/userModel.js";
import Like from "../../models/likeModel.js";
import Comment from "../../models/commentModel.js";
import CustomError from "../../utilities/customError.js";

const postOneFile = async (req, res, next) => {
  if (!req.file) {
    return next(new CustomError("Please upload a file", 400));
  }
  const { caption } = req.body;
  const user = await User.findById(req.user.id, {
    password: 0,
    email: 0,
    __v: 0,
    createdAt: 0,
    updatedAt: 0,
  });
  if (!user) {
    return next(new CustomError("User not found", 404));
  }
  const isReel = req.file.mimetype.includes("video");
  const newPost = new Post({
    username: user.username,
    caption: caption ? caption : "",
    media: req.uploadedFile.secure_url,
    isReel,
  });

  await newPost.save();
  res.status(200).json({
    message: "File uploaded successfully",
    file: {
      url: req.uploadedFile.secure_url,
    },
  });
};

const getCurrUserPosts = async (req, res, next) => {
  const user = await User.findById(req.user.id, {
    password: 0,
    email: 0,
    __v: 0,
    createdAt: 0,
    updatedAt: 0,
  });
  if (!user) {
    return next(new CustomError("User not found", 404));
  }
  const posts = await Post.find({ username: user.username }).sort({
    createdAt: -1,
  });
  res.status(200).json({ message: "Posts fetched successfully", posts });
};

const getCurrUserReels = async (req, res, next) => {
  const user = await User.findById(req.user.id, {
    password: 0,
    email: 0,
    __v: 0,
    createdAt: 0,
    updatedAt: 0,
  });
  if (!user) {
    return next(new CustomError("User not found", 404));
  }
  const reels = await Post.find({ username: user.username, isReel: true }).sort(
    { createdAt: -1 }
  );
  res.status(200).json({ message: "Posts fetched successfully", reels });
};

const getUserPosts = async (req, res, next) => {
  if (!req.params.username) {
    return next(new CustomError("Please provide username", 400));
  }
  const posts = await Post.find({ username: req.params.username }).sort({
    createdAt: -1,
  });
  res.status(200).json({ message: "Posts fetched successfully", posts });
};

const getUserReels = async (req, res, next) => {
  if (!req.params.username) {
    return next(new CustomError("Please provide username", 400));
  }
  const reels = await Post.find({
    username: req.params.username,
    isReel: true,
  }).sort({ createdAt: -1 });
  res.status(200).json({ message: "Posts fetched successfully", reels });
};

const deletePost = async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new CustomError("Post not found", 404));
  }
  await post.remove();
  res.status(200).json({ message: "Post deleted successfully" });
};

const likePost = async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new CustomError("Post not found", 404));
  }
  const like = await Like.findOne({ user: req.user.id, post: req.params.id });
  if (like) {
    await Like.deleteOne({ user: req.user.id, post: req.params.id });
    return res.status(200).json({ message: "Post unliked successfully" });
  }
  const newLike = new Like({ user: req.user.id, post: req.params.id });
  await newLike.save();
  res.status(200).json({ message: "Post liked successfully" });
};

const commentPost = async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  const commnet = req.body;
  if (!post) {
    return next(new CustomError("Post not found", 404));
  }
  const newComment = new Comment({
    user: req.user.id,
    post: req.params.id,
    comment: commnet,
  });
  await newComment.save();
  res.status(200).json({ message: "Comment added successfully" });
};

const deleteComment = async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return next(new CustomError("Comment not found", 404));
  }
  await comment.remove();
  res.status(200).json({ message: "Comment deleted successfully" });
};

const likesCount = async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new CustomError("Post not found", 404));
  }
  const likes = await Like.find({ post: req.params.id });
  res
    .status(200)
    .json({ message: "Likes fetched successfully", likes: likes.length });
};

const commentsCount = async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new CustomError("Post not found", 404));
  }
  const comments = await Comment.find({ post: req.params.id });
  res
    .status(200)
    .json({
      message: "Comments fetched successfully",
      comments: comments.length,
    });
};

export {
  postOneFile,
  getCurrUserPosts,
  getUserPosts,
  deletePost,
  likePost,
  getCurrUserReels,
  getUserReels,
  commentPost,
  deleteComment,
  likesCount,
  commentsCount,
};
