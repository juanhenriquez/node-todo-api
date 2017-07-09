const express = require('express');
const bodyParser = require('body-parser');

// import handlers
const { messageValidationErrors, notFoundErrors } = require('./handlers/errorHandlers');


// config info
const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/todo-app';
} else if (env === 'test'){
  process.env.PORT = 8080;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/todo-app-test';
}
const PORT = process.env.PORT;

// create the app
const app = express();

// import and set main routes
const routes = require('./routes/routes');

// set middlewares
app.use(bodyParser.json());

// set root endpoint and app's routes
app.use('/api', routes);

// error handlers
app.use(notFoundErrors);
app.use(messageValidationErrors);

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});

module.exports = app;
