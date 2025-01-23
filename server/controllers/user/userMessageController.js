import Message from "../../models/messageModel.js";
import User from "../../models/userModel.js";
import Follow from "../../models/followModel.js";
import Notification from "../../models/notificationModel.js";
import { io, userSocketMap } from "../../socket.js";
import CustomError from "../../utilities/customError.js";
import mongoose from "mongoose";

export const sendMessage = async (req, res, next) => {
  const { receiverId, content } = req.body;
  const senderId = req.user.id;

  if (senderId.toString() === receiverId) {
    return res.status(400).json({ error: "Cannot send message to yourself" });
  }

  const receiver = await User.findById(receiverId);
  if (!receiver) {
    return next(new CustomError("Receiver not found", 404));
  }

  const newMessage = await Message.create({
    sender: senderId,
    receiver: receiverId,
    content,
  });

  const notification = await Notification.create({
    recipient: receiverId,
    sender: senderId,
    type: "message",    
  });

  if (userSocketMap[receiverId]) {
    io.to(userSocketMap[receiverId]).emit("receiveMessage", newMessage);
    io.to(userSocketMap[receiverId]).emit("newNotification", notification);
  }

  res.status(201).json({ newMessage: newMessage });
};

export const getConversation = async (req, res) => {
  const { userId } = req.params;
  const currentUserId = req.user.id;

  const otherUser = await User.findById(userId);
  if (!otherUser) {
    return res.status(404).json({ error: "User not found" });
  }

  const messages = await Message.find({
    $or: [
      { sender: currentUserId, receiver: userId },
      { sender: userId, receiver: currentUserId },
    ],
  })
    .sort({ createdAt: 1 })
    .limit(50);

  res.status(200).json(messages);
};

export const markMessageAsRead = async (req, res) => {
  const { messageId } = req.params;
  const userId = req.user.id;

  try {
    const message = await Message.findOneAndUpdate(
      { _id: messageId, receiver: userId, read: false },
      { read: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.status(200).json({ message: "Message marked as read" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getConversationList = async (req, res) => {
  const userId = req.user.id;

  const selectFields = {
    fullname: 1,
    username: 1,
    profile: 1,
    _id: 1,
  };

  const chatUsers = await Message.aggregate([
    {
      $match: {
        $or: [
          { sender: new mongoose.Types.ObjectId(userId) },
          { receiver: new mongoose.Types.ObjectId(userId) },
        ],
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $group: {
        _id: {
          $cond: [
            { $eq: ["$sender", new mongoose.Types.ObjectId(userId)] },
            "$receiver",
            "$sender",
          ],
        },
        lastMessage: { $first: "$$ROOT" },
      },
    },
    {
      $limit: 5,
    },
  ]);

  if (chatUsers.length > 0) {
    const userIds = chatUsers.map((chat) => chat._id);
    const users = await User.find({ _id: { $in: userIds } }, selectFields);

    return res.status(200).json({
      users,
      source: "chats",
    });
  }

  const followers = await Follow.find({ following: userId })
    .populate("follower", "fullname username profile")
    .limit(5);

  const followerUsers = followers.map((follow) => follow.follower);

  return res.status(200).json({
    users: followerUsers,
    source: "followers",
  });
};
