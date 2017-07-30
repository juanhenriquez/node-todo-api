"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// config info
const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
    process.env.PORT = '3000';
    process.env.MONGODB_URI = 'mongodb://localhost:27017/todo-app';
}
else if (env === 'test') {
    process.env.PORT = '8080';
    process.env.MONGODB_URI = 'mongodb://localhost:27017/todo-app-test';
}
const server_1 = require("./server");
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
console.log(PORT, MONGODB_URI);
const server = new server_1.Server();
server.setPort(PORT);
server.setMongoUri(MONGODB_URI);
const app = server.getApp();
exports.app = app;
app.listen(PORT, () => {
    console.log(`Conectado al puerto ${PORT}`);
});
//# sourceMappingURL=app.js.map