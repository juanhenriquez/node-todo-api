const mongoose = require('mongoose');

const DB_URI = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;
const connection = mongoose.connect(DB_URI, { useMongoClient: true });

module.exports = mongoose;
