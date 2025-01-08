import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
  },
  media: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  likesCount: {
    type: Number,
    default: 0,
  },
  commentsCount: {
    type: Number,
    default: 0,
  },
  saves: {
    type: [String],
    default: [],
  },
  savesCount: {
    type: Number,
    default: 0,
  },
  isReel: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Post = mongoose.model("Post", postSchema);
export default Post;
