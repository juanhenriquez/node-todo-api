import { Router } from 'express';
import { TodosController } from './../controllers/todos/todos.controller';

// handlers
import { catchErrors } from './../middlewares/errors.middleware';

const router = Router();

router.get('/', catchErrors(TodosController.index));
router.post('/', catchErrors(TodosController.create));
router.get('/:id', catchErrors(TodosController.show));
router.put('/:id', catchErrors(TodosController.update));
router.delete('/:id', catchErrors(TodosController.remove));

console.log(router);

export { router };
