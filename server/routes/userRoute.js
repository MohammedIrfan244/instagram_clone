import express from 'express'
import tryCatch from '../utilities/tryCatch.js'
import verifyToken from '../middlewares/verifyToken.js'
import upload from '../config/multerConfig.js'
import { getOneUser, getUsersByUsername, postOneFile } from '../controllers/userController.js'
import { uploadToCloudinay } from '../middlewares/fileUpload.js'


const routeer=express.Router()

routeer
.get('/get_one_user/:username',verifyToken,tryCatch(getOneUser))
.get('/get_users/:username',verifyToken,tryCatch(getUsersByUsername))

.post('/post_one_file',upload.single('file'),verifyToken,uploadToCloudinay,tryCatch(postOneFile))


export default routeer