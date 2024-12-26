import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import manageError from './middlewares/manageError.js'
import connectDb from './config/mongoConfig.js'


const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

dotenv.config()
connectDb()


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
