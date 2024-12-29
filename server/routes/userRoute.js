import express from 'express'
import tryCatch from '../utilities/tryCatch.js'
import verifyToken from '../middlewares/verifyToken.js'
import upload from '../config/multerConfig.js'

import { uploadToCloudinary } from '../middlewares/fileUpload.js'
import { getOneUser, getUsersByUsername } from '../controllers/user/userQueryController.js'
import { deleteUserProfilePicture, updateUserProfilePicture } from '../controllers/user/userProfileController.js'
import { postOneFile } from '../controllers/user/userPostController.js'
import idValidation from '../middlewares/idValidation.js'
import { followUser, unfollowUser } from '../controllers/user/userFollowController.js'


const routeer=express.Router()

routeer
.get('/get_one_user/:username',verifyToken,tryCatch(getOneUser))
.get('/get_users/:username',verifyToken,tryCatch(getUsersByUsername))
.post('/update_user_profile_picture',upload.single('file'),verifyToken,uploadToCloudinary,tryCatch(updateUserProfilePicture))
.delete('/delete_user_profile_picture',verifyToken,tryCatch(deleteUserProfilePicture))
.post('/post_one_file',upload.single('file'),verifyToken,uploadToCloudinary,tryCatch(postOneFile))
.post('/follow_user',verifyToken,idValidation,tryCatch(followUser))
.post('/unfollow_user',verifyToken,idValidation,tryCatch(unfollowUser))


export default routeer