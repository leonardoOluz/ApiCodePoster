/* eslint-disable no-undef */
import mongoose from 'mongoose';

const user = process.env.DB_USER;
const password = process.env.DB_PASS;

const uri = `mongodb+srv://${user}:${password}@clusterleoluz.zoaawnu.mongodb.net/db_text-edition?retryWrites=true&w=majority&appName=ClusterLeoLuz`;

const dbConnection = async () => {
  mongoose.connect(uri);
  return mongoose.connection;
};

export default dbConnection;
