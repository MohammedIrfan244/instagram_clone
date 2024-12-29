import express from 'express'
import tryCatch from '../utilities/tryCatch.js'
import { refreshingToken, userLogin, userLogout, userRegister } from '../controllers/authController.js'
import verifyToken from '../middlewares/verifyToken.js'

const router = express.Router()

router
.post('/register',tryCatch(userRegister))
.post('/login',tryCatch(userLogin))
.post('/logout',verifyToken,tryCatch(userLogout))
.post('/refresh_token',tryCatch(refreshingToken))

export default router