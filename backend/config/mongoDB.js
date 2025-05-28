import mongoose, { connect } from "mongoose";

const connectDB = async () => {

    try {
        await mongoose.connect(`${process.env.MONGO_URI}/LexiLens`);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1); // Exit the app if DB connection fails
    }
};


export default connectDB;