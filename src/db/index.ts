import mongoose = require('mongoose');
import { Model, Document } from 'mongoose';

const DB_URI = process.env.MONGODB_URI;
mongoose.Promise = global.Promise;
console.log(process.env.MONGODB_URI);
export const db = mongoose.createConnection(DB_URI, { useMongoClient: true });