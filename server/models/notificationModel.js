import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  type: {
    type: String,
    enum: ["follow", "message", "like", "comment"],
    required: true
  },
  read: {
    type: Boolean,
    default: false
  },
  media: {
    type: String,
    default: ""
  },
}, { timestamps: true });

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;