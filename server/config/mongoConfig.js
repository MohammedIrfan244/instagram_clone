import mongoose from "mongoose";

const connectDb=async()=>{
    mongoose.connection.on("connected",()=>{
        console.log("MongoDB connected")
    })
    try {
        await mongoose.connect(process.env.MONGO_URI)
    } catch (error) {
        console.log("from mongo",error)
    }
}

export default connectDb;