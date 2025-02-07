import mongoose from "mongoose";
import logger from "../utilities/logger.js";

const connectDb=async()=>{
    mongoose.connection.on("connected",()=>{
        logger.info("connected to mongo")
    })
    try {
        await mongoose.connect(process.env.MONGO_URI)
    } catch (error) {
        logger.error(error)
    }
}

export default connectDb;