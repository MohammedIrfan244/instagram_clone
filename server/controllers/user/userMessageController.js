import Message from "../../models/messageModel.js";
import User from "../../models/userModel.js";
import Follow from "../../models/followModel.js";
import { io, userSocketMap } from "../../socket.js";
import CustomError from "../../utilities/customError.js";
import mongoose from "mongoose";

export const sendMessage = async (req, res, next) => {
  const { receiverId, content } = req.body;
  const senderId = req.user.id;

  // Check if receiver exists and isn't the sender
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

  // Emit the message to the receiver's socket
  if (userSocketMap[receiverId]) {
    io.to(userSocketMap[receiverId]).emit("receiveMessage", newMessage);
  }

  res.status(201).json({ newMessage: newMessage });
};

export const getConversation = async (req, res) => {
  const { userId } = req.params;
  const currentUserId = req.user.id;

  // Check if user exists
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
    .limit(50); // Limit to last 50 messages for performance

  res.status(200).json(messages);
};

// Optional: Get list of users with active conversations
export const getConversationList = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Fields to return
    const selectFields = {
      fullname: 1,
      username: 1,
      profile: 1,
      _id: 1
    };

    // First, get unique users who have chatted with current user
    const chatUsers = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: new mongoose.Types.ObjectId(userId) },
            { receiver: new mongoose.Types.ObjectId(userId) }
          ]
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$sender", new mongoose.Types.ObjectId(userId)] },
              "$receiver",
              "$sender"
            ]
          },
          lastMessage: { $first: "$$ROOT" }
        }
      },
      {
        $limit: 5
      }
    ]);

    // If chat users found, populate their details
    if (chatUsers.length > 0) {
      const userIds = chatUsers.map(chat => chat._id);
      const users = await User.find(
        { _id: { $in: userIds } },
        selectFields
      );

      return res.status(200).json({ 
        users,
        source: "chats"
      });
    }

    // If no chat users found, get followers instead
    const followers = await Follow.find({ following: userId })
      .populate('follower', 'fullname username profile')
      .limit(5);

    const followerUsers = followers.map(follow => follow.follower);

    return res.status(200).json({ 
      users: followerUsers,
      source: "followers"
    });

  } catch (error) {
    console.error("Error in getConversationList:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
