import mongoose from "mongoose";    

const savedSchema = new mongoose.Schema({    
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },    
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },    
    date: { type: Date, default: Date.now },    
});    
const SavedPost = mongoose.model("SavedPost", savedSchema);    
export default SavedPost;