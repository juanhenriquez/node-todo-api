import { Router } from 'express';
import { isAuthenticated, canAccess } from './../middlewares/auth.middleware';

// controller
import { UsersController } from './../controllers/user/users.controller';

// handlers
import { catchErrors } from './../middlewares/errors.middleware';

const router = Router();

router.post('/signup', catchErrors(UsersController.create));
router.post('/signin', [isAuthenticated, canAccess], catchErrors(UsersController.show));

export { router };
