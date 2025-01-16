import Story from "../../models/storyModel.js";
import CustomError from "../../utilities/customError.js";
import Follow from "../../models/followModel.js";
import User from "../../models/userModel.js";


function timeAgo(date) {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "week", seconds: 604800 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
    ];
  
    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count > 0) {
        return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
      }
    }
  
    return "just now";
  }

  

const postStory = async (req, res, next) => {
  if (!req.file) {
    return next(new CustomError("Please upload a file", 400));
  }
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new CustomError("User not found", 404));
  }
  const media = req.uploadedFile.secure_url;
  const story = await Story.findOne({ user: req.user.id });

  const newMedia = {
    url: media,
    header: {
      heading: user.username,
      subheading: `Posted ${timeAgo(new Date())}`,
      profileImage: user.profile,
    },
  };
  

  if (story) {
    await Story.updateOne(
      { user: req.user.id },
      { $push: { media: newMedia } },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Story updated successfully", story });
  }
  const newStory = new Story({
    user: req.user.id,
    media: [newMedia],
  });
  await newStory.save();
  res
    .status(200)
    .json({ message: "Story posted successfully", story: newStory });
};


const getStories = async (req, res, next) => {
  const follow = await Follow.find({
    $or: [{ follower: req.user.id }, { following: req.user.id }],
  });
  if (!follow) {
    return res.status(200).json({ stories: [] });
  }
  const userIds = follow
    .map((f) => f.follower.toString())
    .concat(follow.map((f) => f.following.toString()))
    .filter((id) => id !== req.user.id.toString());
  const stories = await Story.find({ user: { $in: userIds } })
    .populate("user", "username profile")
    .sort({ createdAt: -1 });
  const currentUserStories = await Story.find({ user: req.user.id })
    .populate("user", "username profile")
    .sort({ createdAt: -1 });
  if (currentUserStories.length > 0) {
    stories.unshift(currentUserStories[0]);
  }
  const usersWithStories = stories.map((s) => ({
    user: s.user,
    hasSeen: s.seenBy.includes(req.user.id),
    _id: s._id,
  }));
  res.status(200).json({ stories: usersWithStories });
};



const getOneStory = async (req, res, next) => {
  const story = await Story.findById(req.params.id).populate(
    "user",
    "username profile"
  );
  if (!story) {
    return next(new CustomError("Story not found", 404));
  }
  const isLiked = story.likes.includes(req.user.id);
  res.status(200).json({ story , isLiked });
};




const likeStory = async (req, res, next) => {
  const story = await Story.findById(req.params.id);
  if (!story) {
    return next(new CustomError("Story not found", 404));
  }
  const isLiked = story.likes.includes(req.user.id);
  if (isLiked) {
    await Story.updateOne(
      { _id: req.params.id },
      { $pull: { likes: req.user.id } }
    );
    res.status(200).json({ message: "Story unliked successfully" });
  } else {
    await Story.updateOne(
      { _id: req.params.id },
      { $push: { likes: req.user.id } }
    );
    res.status(200).json({ message: "Story liked successfully" });
  }
  res.status(200).json({ message: "Story liked successfully" });
};





const addToSeen = async (req, res, next) => {
  const story = await Story.findById(req.params.id);
  if (!story) {
    return next(new CustomError("Story not found", 404));
  }
  const isSeen = story.seenBy.includes(req.user.id);
  if (isSeen) {
    return res.status(200).json({ message: "Story seen successfully" });
  }
  await Story.updateOne(
    { _id: req.params.id },
    { $push: { seenBy: req.user.id } }
  );
  res.status(200).json({ message: "Story seen successfully" });
};

export { postStory, getStories, likeStory, getOneStory, addToSeen };
