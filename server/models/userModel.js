import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  profile: {
    type: String,
    default:
      "https://i.pinimg.com/736x/20/05/e2/2005e27a39fa5f6d97b2e0a95233b2be.jpg",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    default: "Prefer not to say",
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
