import express from 'express'
import tryCatch from '../utilities/tryCatch.js'
import { facebookCallback, facebookLogin, refreshingToken, sendOtp, userLogin, userLogout, verifyOtpAndRegister } from '../controllers/authController.js'
import verifyToken from '../middlewares/verifyToken.js'

const router = express.Router()

router
.post('/send_otp',tryCatch(sendOtp))
.post('/verify_otp',tryCatch(verifyOtpAndRegister))
.post('/login',tryCatch(userLogin))
.post('/logout',tryCatch(userLogout))
.post('/refresh_token',tryCatch(refreshingToken))
.get('/facebook',facebookLogin)
.get('/facebook/callback',facebookCallback)

export default router