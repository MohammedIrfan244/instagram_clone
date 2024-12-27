import express from 'express'
import tryCatch from '../utilities/tryCatch.js'
import { userLogin, userLogout, userRegister } from '../controllers/authController.js'
import verifyToken from '../middlewares/verifyToken.js'

const router = express.Router()

router
.post('/user/register',tryCatch(userRegister))
.post('/user/login',tryCatch(userLogin))
.post('/user/logout',verifyToken,tryCatch(userLogout))

export default router