import User from "../../models/userModel.js";
import CustomError from "../../utilities/customError.js";

const getOneUser = async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username });
  if (!user) {
    return next(new CustomError("User not found", 404));
  }
  const userDetail = {
    _id: user._id,
    fullname: user.fullname,
    username: user.username,
    profile: user.profile,
    bio: user.bio,
    gender: user.gender,
    email: user.email,
  };
  res.status(200).json({ user: userDetail });
};

const getUsersByUsername = async (req, res, next) => {
  const users = await User.find({
    $or: [
      { username: { $regex: req.params.username, $options: "i" } },
      { fullname: { $regex: req.params.username, $options: "i" } },
    ],
  },
  { username: 1, fullname: 1, profile: 1 });
  if (users.length === 0) {
    return res.status(200).json({ users: [], message: "No user found" });
  }
  res.status(200).json(users);
};

export { getOneUser, getUsersByUsername };