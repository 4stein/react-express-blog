import mongoose from 'mongoose';

// db connect
const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI || 'mongodb://mongo:27017/blog')
    .then(() => console.log('MongoDB has connected successfully.'))
    .catch(err => console.log('DB error', err));
};

export default connectDB;
