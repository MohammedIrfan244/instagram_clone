import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    media: {
        type: [String],
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
    seenBy: {
        type: [String],
        default: [],
    },
}, { timestamps: true });

const Story = mongoose.model("Story", storySchema);

export default Story;
    