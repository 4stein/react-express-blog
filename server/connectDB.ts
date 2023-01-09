import mongoose from 'mongoose';

// db connect
const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI || 'mongodb://mongo:27017/blog')
    .then(() => console.log('MongoDB has connected successfully.'))
    .catch(err => console.log('DB error', err));
};

export default connectDB;

// import mongoose from 'mongoose';

// const connectionString = 'mongodb://mongo:27017/blog';

// // db connect
// const connectDB = () => {
//   mongoose
//     .connect(connectionString, { useNewUrlParser: true })
//     .then(() => console.log('MongoDB has connected successfully.'))
//     .catch(err => console.error('Connection error', err.message));
// };

// export default connectDB;
