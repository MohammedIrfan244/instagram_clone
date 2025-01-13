import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

console.log(process.env.EMAIL_ID,process.env.EMAIL_PASSWORD)

const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASSWORD
        }
    });

export default transporter