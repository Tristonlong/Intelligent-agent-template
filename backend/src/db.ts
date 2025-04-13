import mongoose from 'mongoose';

// 从环境变量中获取 MongoDB URI
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/my_database';

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};