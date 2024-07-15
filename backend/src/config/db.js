import mongoose from "mongoose";

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            
        })
        console.log(`MongoDB Connected: ${process.env.MONGODB_URI}/WORA`)
    }
    catch(error){
        console.log('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

export default connectDB