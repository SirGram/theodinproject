import mongoose from 'mongoose';
const dotenv = require('dotenv');

dotenv.config()
export const connectToDB = async () => {
    const mongoDB = process.env.MONGODB!
  try {
    await mongoose.connect(mongoDB);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};
