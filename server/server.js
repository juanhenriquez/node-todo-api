const express = require('express');
const bodyParser = require('body-parser');

// import handlers
const { messageValidationErrors } = require('./handlers/errorHandlers');

// create the app
const app = express();

// set middlewares
app.use(bodyParser.json());

// config info
const PORT = process.env.PORT || 3000;

// import and set main routes
const routes = require('./routes/routes');
app.use('/api', routes);

// error handlers
app.use(messageValidationErrors);

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});

module.exports = app;
