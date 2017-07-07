const mongoose = require('mongoose');

const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-app';

mongoose.Promise = global.Promise;
const connection = mongoose.connect(DB_URI, { useMongoClient: true });

module.exports = mongoose;
