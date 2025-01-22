import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import manageError from './middlewares/manageError.js'
import connectDb from './config/mongoConfig.js'
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'
import notificationRoute from './routes/notificationRoute.js'
import messageRoute from './routes/messageRoute.js'
import { app,server } from './socket.js'
import session from 'express-session'


dotenv.config()
connectDb()

app.use(express.json())
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))


app.use('/api/user',userRoute)
app.use('/api/auth',authRoute)
app.use('/api/message',messageRoute)
app.use('/api/notification',notificationRoute)

app.get('/', (req, res) => {
    res.json({ message: 'Server is running' })
})

app.all('*', (req, res, next) => {
    res.status(404).json({ message: 'Route not found' })
})
app.use(manageError)

server.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})

