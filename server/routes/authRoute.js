import express from 'express'
import tryCatch from '../utilities/tryCatch.js'
import { userLogin, userRegister } from '../controllers/authController.js'

const router = express.Router()

router
.post('/user/register',tryCatch(userRegister))
.post('/user/login',tryCatch(userLogin))

export default router