// models/Message.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  }
}, 
{ 
  timestamps: true 
});

// For efficient querying of conversations
messageSchema.index({ sender: 1, receiver: 1, createdAt: -1 });

// Add virtual fields to get user details when populated
messageSchema.virtual('senderDetails', {
  ref: 'User',
  localField: 'sender',
  foreignField: '_id',
  justOne: true,
  select: 'username fullname profile'
});

messageSchema.virtual('receiverDetails', {
  ref: 'User',
  localField: 'receiver',
  foreignField: '_id',
  justOne: true,
  select: 'username fullname profile'
});

// Ensure virtuals are included when converting to JSON
messageSchema.set('toJSON', { virtuals: true });
messageSchema.set('toObject', { virtuals: true });

const Message = mongoose.model("Message", messageSchema);
export default Message;