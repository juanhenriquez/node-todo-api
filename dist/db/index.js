"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const DB_URI = process.env.MONGODB_URI;
mongoose.Promise = global.Promise;
console.log(process.env.MONGODB_URI);
exports.db = mongoose.createConnection(DB_URI, { useMongoClient: true });
//# sourceMappingURL=index.js.map