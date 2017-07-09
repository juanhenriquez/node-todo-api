const express = require('express');
const router = express.Router();

const todosRoutes = require('./todos.route');
const usersRoutes = require('./users.route');

router.use('/todos', todosRoutes);
router.use('/users', usersRoutes);

module.exports = router;
