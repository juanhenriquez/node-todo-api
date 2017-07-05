const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const connection = mongoose.connect('mongodb://localhost:27017/todo-app', { useMongoClient: true });

module.exports = mongoose;
