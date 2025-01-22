import Message from "../../models/messageModel.js";
import User from "../../models/userModel.js"; 
import { io,userSocketMap } from "../../socket.js";
import CustomError from "../../utilities/customError.js";


export const sendMessage = async (req, res ,next) => {
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
      content
    });


    // Emit the message to the receiver's socket
    if (userSocketMap[receiverId]) {
      io.to(userSocketMap[receiverId]).emit("receiveMessage", newMessage);
    }

    res.status(201).json({message: newMessage});
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
        { sender: userId, receiver: currentUserId }
      ]
    })
    .sort({ createdAt: 1 })
    .limit(50)  // Limit to last 50 messages for performance

    res.status(200).json(messages);
  
};

// Optional: Get list of users with active conversations
export const getConversationList = async (req, res) => {
  
    const userId = req.user.id;

    // Find unique users who have exchanged messages with current user
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { receiver: userId }]
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ['$sender', userId] },
              '$receiver',
              '$sender'
            ]
          },
          lastMessage: { $first: '$$ROOT' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          pipeline: [
            {
              $project: {
                username: 1,
                fullname: 1,
                profile: 1
              }
            }
          ],
          as: 'userDetails'
        }
      },
      {
        $unwind: '$userDetails'
      }
    ]);

    res.status(200).json(conversations);
 
};