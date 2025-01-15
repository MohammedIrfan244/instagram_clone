import express from "express";
import tryCatch from "../utilities/tryCatch.js";
import verifyToken from "../middlewares/verifyToken.js";
import upload from "../config/multerConfig.js";

import { uploadToCloudinary } from "../middlewares/fileUpload.js";
import {
  getCommentedPosts,
  getExploreFeed,
  getHomePageFeed,
  getLikedPosts,
  getOneUser,
  getReelFeed,
  getSavedPosts,
  getUsersByUsername,
  isLiked,
  isSaved,
  suggestedUsers,
  userProfilePic,
} from "../controllers/user/userQueryController.js";
import {
  deleteUserProfilePicture,
  updateUserProfilePicture,
} from "../controllers/user/userProfileController.js";
import {
  commentPost,
  commentsCount,
  deleteComment,
  deletePost,
  getCommnetBox,
  getCurrUserPosts,
  getCurrUserReels,
  getOnePost,
  getUserPosts,
  getUserReels,
  likePost,
  likesCount,
  postOneFile,
  savePost,
} from "../controllers/user/userPostController.js";
import {
  followToggle,
  getFollowCount,
  getFollowerList,
  getFollowingList,
  getFollowStatus,
  removeFollower,
} from "../controllers/user/userFollowController.js";
import idValidation from "../middlewares/idValidation.js";
import { userUpdate } from "../controllers/user/userProfileController.js";
import { getStories, getOneStory, likeStory, postStory } from "../controllers/user/userStoryController.js";

const router = express.Router();

router

  // follow
  .post("/follow_user/", verifyToken, tryCatch(followToggle))
  .delete(
    "/remove_follow/:id",
    verifyToken,
    idValidation,
    tryCatch(removeFollower)
  )
  .get(
    "/follower_list/:id",
    verifyToken,
    idValidation,
    tryCatch(getFollowerList)
  )
  .get(
    "/following_list/:id",
    verifyToken,
    idValidation,
    tryCatch(getFollowingList)
  )
  .get("/follow_count/:id", verifyToken, idValidation, tryCatch(getFollowCount))
  .get(
    "/follow_status/:id",
    verifyToken,
    idValidation,
    tryCatch(getFollowStatus)
  )

  // profile
  .post(
    "/update_user/profile_picture",
    verifyToken,
    upload.single("file"),
    uploadToCloudinary,
    tryCatch(updateUserProfilePicture)
  )
  .delete(
    "/delete_user/profile_picture",
    verifyToken,
    tryCatch(deleteUserProfilePicture)
  )
  .post("/user_update", verifyToken, tryCatch(userUpdate))
.get('/profile_pic/:username',tryCatch(userProfilePic))

  // users
  .get("/get_users/:username", verifyToken, tryCatch(getUsersByUsername))
  .get("/get_one_user/:username", verifyToken, tryCatch(getOneUser))
  .get("/suggested_users", verifyToken, tryCatch(suggestedUsers))

  // posts
  .post(
    "/post/post_one_file",
    verifyToken,
    upload.single("file"),
    uploadToCloudinary,
    tryCatch(postOneFile)
  )
  .post("/post/comment_post/:id", verifyToken, tryCatch(commentPost))
  .post("/post/like_post/:id", verifyToken, tryCatch(likePost))
  .delete("/post/delete_post/:id", verifyToken, tryCatch(deletePost))
  .delete("/post/delete_comment/:id", verifyToken, tryCatch(deleteComment))
  .get("/post/get_curruser_posts", verifyToken, tryCatch(getCurrUserPosts))
  .get("/post/get_curruser_reels", verifyToken, tryCatch(getCurrUserReels))
  .get("/post/get_user_posts/:username", verifyToken, tryCatch(getUserPosts))
  .get("/post/get_user_reels/:username", verifyToken, tryCatch(getUserReels))
  .get("/post/liked_posts", verifyToken, tryCatch(getLikedPosts))
  .get("/post/commented_posts", verifyToken, tryCatch(getCommentedPosts))
  .get("/post/saved_posts", verifyToken, tryCatch(getSavedPosts))
  .get("/post/home_page", verifyToken, tryCatch(getHomePageFeed))
  .get("/post/explore_page", verifyToken, tryCatch(getExploreFeed))
  .get('/post/reel_page',verifyToken,tryCatch(getReelFeed))
  .get("/post/get_like_count/:id", verifyToken, tryCatch(likesCount))
  .get("/post/get_comment_count/:id", verifyToken, tryCatch(commentsCount))
  .get("/post/get_one_post/:id", verifyToken, tryCatch(getOnePost))
  .get("/post/is_liked/:id", verifyToken, tryCatch(isLiked))
  .get("/post/is_saved/:id", verifyToken, tryCatch(isSaved))
  .post("/post/save_post/:id", verifyToken, tryCatch(savePost))
  .get("/post/get_comments/:id", verifyToken, tryCatch(getCommnetBox))

  // story

  .post("/story/post_one_file", verifyToken, upload.single("file"), uploadToCloudinary, tryCatch(postStory))
  .get("story/get_follow_user_story", verifyToken, tryCatch(getStories))
  .post("/story/like_story/:id", verifyToken, tryCatch(likeStory))
  .get("/story/get_one_story/:id", verifyToken, tryCatch(getOneStory));

export default router;
