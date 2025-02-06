import express, { response } from 'express'
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
import logger from './utilities/logger.js'
import morgan from 'morgan'


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


app.use(morgan(morganFormat, { 
    stream:{
        write:(message)=>{
            const logObject={
                method: message.split(' ')[0],
                url: message.split(' ')[1],
                status: message.split(' ')[2],
                date: new Date(),
                responseTime: message.split(' ')[3],
            }
            logger.info(JSON.stringify(logObject))
        }
    } 
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
    logger.info(`Server is running on port ${process.env.PORT}`)
})

