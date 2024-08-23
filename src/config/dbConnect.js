/* eslint-disable no-undef */
import mongoose from 'mongoose';

const url = process.env.URL;
const urlDbMongo = url;

const dbConnection = async () => {
  await mongoose.connect(urlDbMongo);
  return mongoose.connection;
};

export default dbConnection;
