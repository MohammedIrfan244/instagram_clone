import express from 'express'
import tryCatch from '../utilities/tryCatch.js'
import verifyToken from '../middlewares/verifyToken.js'
import { getOneUser, getUsersByUsername } from '../controllers/userController.js'


const routeer=express.Router()

routeer
.get('/getOneUser/:username',verifyToken,tryCatch(getOneUser))
.get('/getUsers/:username',verifyToken,tryCatch(getUsersByUsername))


export default routeer