import express from 'express'
import tryCatch from '../utilities/tryCatch.js'
import verifyToken from '../middlewares/verifyToken.js'
import upload from '../config/multerConfig.js'
import { getOneUser, getUsersByUsername, postOneFile } from '../controllers/userController.js'
import { uploadToCloudinay } from '../middlewares/fileUpload.js'


const routeer=express.Router()

routeer
.get('/getOneUser/:username',verifyToken,tryCatch(getOneUser))
.get('/getUsers/:username',verifyToken,tryCatch(getUsersByUsername))

.post('/postOneFile',upload.single('file'),uploadToCloudinay,tryCatch(postOneFile))


export default routeer