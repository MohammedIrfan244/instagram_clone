import Post from "../../models/postModel.js";
import User from "../../models/userModel.js";
import Like from "../../models/likeModel.js";
import Comment from "../../models/commentModel.js";
import CustomError from "../../utilities/customError.js";
import SavedPost from "../../models/savedPostModel.js";

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
  const posts = await Post.find({ username: user.username },{media:1,username:1,likesCount:1,isReel:1,commentsCount:1}).sort({
    createdAt: -1,
  });
  res.status(200).json({ message: "Posts fetched successfully", posts });
};

const getOnePost = async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new CustomError("Post not found", 404));
  }
  res.status(200).json({ message: "Post fetched successfully", post });
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
  await Post.findByIdAndDelete(req.params.id);
  await Like.deleteMany({ post: req.params.id });
  await Comment.deleteMany({ post: req.params.id });
  await SavedPost.deleteMany({ post: req.params.id });
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
    await Post.findByIdAndUpdate(req.params.id, { $inc: { likesCount: -1 } });
    return res.status(200).json({ message: "Post unliked successfully",isLiked:false });
  }
  const newLike = new Like({ user: req.user.id, post: req.params.id });
  await Post.findByIdAndUpdate(req.params.id, { $inc: { likesCount: 1 } });
  await newLike.save();
  res.status(200).json({ message: "Post liked successfully",isLiked:true });
};

const commentPost = async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  const { comment } = req.body;
  if (!post) {
    return next(new CustomError("Post not found", 404));
  }
  const newComment = new Comment({
    user: req.user.id,
    post: req.params.id,
    comment: comment ,
  });
  await newComment.save();
  await Post.findByIdAndUpdate(req.params.id, { $inc: { commentsCount: 1 } });
  res.status(200).json({ message: "Comment added successfully" });
};

const getCommnetBox = async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new CustomError("Post not found", 404));
  }
  const comments = await Comment.find({ post: req.params.id }).sort({ createdAt: -1 }).populate("user", ["username", "profile"]);
  res.status(200).json({ message: "Comments fetched successfully", comments });
};

const deleteComment = async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return next(new CustomError("Comment not found", 404));
  }
  await Comment.findByIdAndDelete(req.params.id);
  // const commentCount=await Comment.find({post:comment.post}).count();
  await Post.findByIdAndUpdate(comment.post, { $inc: { commentsCount: -1 } });
  res.status(200).json({ message: "Comment deleted successfully" });
};

const likesCount = async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new CustomError("Post not found", 404));
  }
  const likes = post.likesCount;
  res
    .status(200)
    .json({ message: "Likes fetched successfully", likes: likes });
};

const commentsCount = async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new CustomError("Post not found", 404));
  }
  const comments = post.commentsCount;
  res
    .status(200)
    .json({
      message: "Comments fetched successfully",
      comments: comments,
    });
};

const savePost = async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new CustomError("Post not found", 404));
  }
  const saved = await SavedPost.findOne({ user: req.user.id, post: req.params.id });
  if (saved) {
    await SavedPost.deleteOne({ user: req.user.id, post: req.params.id });
    await Post.findByIdAndUpdate(req.params.id, { $inc: { savedCount: -1 } });
    return res.status(200).json({ message: "Post unsaved successfully",isSaved:false });
  }
  const newSavedPost = new SavedPost({ user: req.user.id, post: req.params.id });
  await Post.findByIdAndUpdate(req.params.id, { $inc: { savedCount: 1 } });
  await newSavedPost.save();
  res.status(200).json({ message: "Post saved successfully",isSaved:true });
};

export {
  postOneFile,
  getCurrUserPosts,
  getUserPosts,
  deletePost,
  savePost,
  likePost,
  getCurrUserReels,
  getUserReels,
  commentPost,
  getOnePost,
  deleteComment,
  likesCount,
  commentsCount,
  getCommnetBox,
};
