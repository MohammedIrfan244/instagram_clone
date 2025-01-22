import e from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import Message from "./models/messageModel.js";
import Notification from "./models/notificationModel.js";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

export const userSocketMap = {};
configDotenv();

export const app = e();
export const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST"],
  },
});

io.use((socket, next) => {
  const passport = socket.handshake.auth;

  if (!passport) {
    return next(new Error("No passport provided"));
  }
  try {
    const user = jwt.verify(passport.token, process.env.JWT_TOKEN);
    socket.handshake.auth.user = user.id;
    socket.data.userId = user.id;

    next();
  } catch (error) {
    next(new Error("Invalid passport"));
  }
});

io.on("connection", async (socket) => {
  const userId = socket.data.userId;

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
  });

  socket.on("join", () => {
    userSocketMap[userId] = socket.id;
  });

  socket.on("sendMessage", async (data) => {
    try {
      const message = await Message.create({
        sender: userId,
        receiver: data.receiverId,
        content: data.content,
      });

      // Create message notification
     const notification = await Notification.create({
        recipient: data.receiverId,
        sender: userId,
        type: "message"
      });

      if (userSocketMap[data.receiverId]) {
        io.to(userSocketMap[data.receiverId]).emit("receiveMessage", message);
        io.to(userSocketMap[data.receiverId]).emit("newNotification", notification);
      }
    } catch (error) {
      console.log("Error in sendMessage:", error);
    }
  });

  socket.on("follow", async (data) => {
    try {
      // Create follow notification
    const notification =  await Notification.create({
        recipient: data.followingId,
        sender: userId,
        type: "follow"
      });

      if (userSocketMap[data.followingId]) {
        io.to(userSocketMap[data.followingId]).emit("newNotification", notification);
      }
    } catch (error) {
      console.log("Error in follow notification:", error);
    }
  });
});
