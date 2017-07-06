const express = require('express');
const router = express.Router();

const TodosController = require('./../../controllers/todos/todos.controller');

// handlers
const { catchErrors } = require('./../../handlers/errorHandlers');

router.get('/', catchErrors(TodosController.index));
router.post('/', catchErrors(TodosController.create));
router.get('/:id', catchErrors(TodosController.show));

module.exports = router;
