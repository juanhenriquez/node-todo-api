const express = require('express');
const router = express.Router();

const TodosController = require('./../controllers/todos/todos.controller');

// handlers
const { catchErrors } = require('./../middlewares/errors.middleware');

router.get('/', catchErrors(TodosController.index));
router.post('/', catchErrors(TodosController.create));
router.get('/:id', catchErrors(TodosController.show));
router.put('/:id', catchErrors(TodosController.update));
router.delete('/:id', catchErrors(TodosController.remove));

module.exports = router;
