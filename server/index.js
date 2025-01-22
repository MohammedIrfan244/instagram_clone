// index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import manageError from "./middlewares/manageError.js";
import connectDb from "./config/mongoConfig.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import Message from "./models/messageModel.js";

const app = express();
const server = createServer(app);

dotenv.config();
connectDb();

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true
  }
});

// Socket authentication middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token?.split(" ")[1];
  
  if (!token) {
    return next(new Error("Authentication required"));
  }

  try {
    const user = jwt.verify(token, process.env.JWT_TOKEN);
    socket.user = user;
    next();
  } catch (err) {
    next(new Error("Invalid token"));
  }
});

// Socket connection handling
io.on("connection", (socket) => {
  const userId = socket.user._id;
  socket.join(`user_${userId}`);
  console.log("User connected:", userId);

  // Handle sending message
  socket.on("send_message", async ({ receiverId, content }) => {
    try {
      const newMessage = await Message.create({
        sender: userId,
        receiver: receiverId,
        content
      });

      await newMessage.populate(['senderDetails', 'receiverDetails']);

      // Emit to both sender and receiver
      io.to(`user_${userId}`).emit("new_message", newMessage);
      io.to(`user_${receiverId}`).emit("new_message", newMessage);
    } catch (error) {
      socket.emit("error", { message: "Failed to send message" });
    }
  });

  // Handle marking messages as read
  socket.on("read_messages", async ({ senderId }) => {
    try {
      await Message.updateMany(
        { 
          sender: senderId, 
          receiver: userId,
          read: false 
        },
        { read: true }
      );

      io.to(`user_${senderId}`).emit("messages_read", { by: userId });
    } catch (error) {
      socket.emit("error", { message: "Failed to mark messages as read" });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", userId);
  });
});

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());

// Routes
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.all("*", (req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling
app.use(manageError);

// Use server.listen instead of app.listen for socket.io
server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});