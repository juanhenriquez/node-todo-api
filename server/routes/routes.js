const express = require('express');
const router = express.Router();

const todosRoutes = require('./todos.route');

router.use('/todos', todosRoutes);
//router.use('/users', UsersController);

module.exports = router;
