// config info
const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  process.env.PORT = '3000';
  process.env.MONGODB_URI = 'mongodb://localhost:27017/todo-app';
} else if (env === 'test'){
  process.env.PORT = '8080';
  process.env.MONGODB_URI = 'mongodb://localhost:27017/todo-app-test';
}

import { Server } from './server';

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
console.log(PORT, MONGODB_URI);
const server = new Server();

server.setPort(PORT);
server.setMongoUri(MONGODB_URI);

const app = server.getApp();

app.listen(PORT, () => {
  console.log(`Conectado al puerto ${PORT}`);
});

export { app };