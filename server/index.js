import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import manageError from './middlewares/manageError.js'
import connectDb from './config/mongoConfig.js'
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'


const app = express()

dotenv.config()
connectDb()

app.use(express.json())
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(cookieParser())


app.use('/api/user',userRoute)
app.use('/api/auth',authRoute)

app.get('/', (req, res) => {
    res.json({ message: 'Server is running' })
})

app.all('*', (req, res, next) => {
    res.status(404).json({ message: 'Route not found' })
})

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})

app.use(manageError)
