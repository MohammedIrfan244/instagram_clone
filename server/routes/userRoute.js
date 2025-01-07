import express from 'express'
import tryCatch from '../utilities/tryCatch.js'
import verifyToken from '../middlewares/verifyToken.js'
import upload from '../config/multerConfig.js'

import { uploadToCloudinary } from '../middlewares/fileUpload.js'
import { getOneUser, getUsersByUsername, suggestedUsers } from '../controllers/user/userQueryController.js'
import { deleteUserProfilePicture, updateUserProfilePicture } from '../controllers/user/userProfileController.js'
import { getCurrUserPosts, getUserPosts, postOneFile } from '../controllers/user/userPostController.js'
import { followToggle, getFollowCount, getFollowerList, getFollowingList, getFollowStatus, removeFollower } from '../controllers/user/userFollowController.js'
import idValidation from '../middlewares/idValidation.js'
import { userUpdate } from '../controllers/user/userProfileController.js'


const router=express.Router()

router

.get('/get_one_user/:username',verifyToken,tryCatch(getOneUser))
.get('/get_users/:username',verifyToken,tryCatch(getUsersByUsername))
.post('/update_user/profile_picture',verifyToken,upload.single('file'),uploadToCloudinary,tryCatch(updateUserProfilePicture))
.delete('/delete_user/profile_picture',verifyToken,tryCatch(deleteUserProfilePicture))
.post('/post/post_one_file',verifyToken,upload.single('file'),uploadToCloudinary,tryCatch(postOneFile))
.get('/post/get_curruser_posts',verifyToken,tryCatch(getCurrUserPosts))
.get('/get_user_posts/:username',tryCatch(getUserPosts))
.post('/follow_user/',verifyToken,tryCatch(followToggle))
.delete('/remove_follow/:id',verifyToken,idValidation,tryCatch(removeFollower))
.get('/follower_list/:id',verifyToken,idValidation,tryCatch(getFollowerList))
.get('/following_list/:id',verifyToken,idValidation,tryCatch(getFollowingList))
.get('/follow_count/:id',verifyToken,idValidation,tryCatch(getFollowCount))
.get('/follow_status/:id',verifyToken,idValidation,tryCatch(getFollowStatus))
.post('/user_update',verifyToken,tryCatch(userUpdate))
.get('/suggested_users',verifyToken,tryCatch(suggestedUsers))



export default router