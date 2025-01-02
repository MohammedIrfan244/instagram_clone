import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    media: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    likes: {
        type: [String],
        default: [],
    },
    comments: {
        type: [String],
        default: [],
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
});

const Post = mongoose.model("Post", postSchema);
export default Post;

