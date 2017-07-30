import { Router }  from 'express';

import { router as todosRoutes } from './todos.route';
import { router as usersRoutes } from './users.route';

const router = Router();

router.use('/todos', todosRoutes);
router.use('/users', usersRoutes);

console.log(router);

export { router };
