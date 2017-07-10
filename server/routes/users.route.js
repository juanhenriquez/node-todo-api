const express = require('express');
const router = express.Router();
const AuthMiddleware = require('./../middlewares/auth.middleware');

const UsersController = require('./../controllers/user/users.controller');

// handlers
const { catchErrors } = require('./../middlewares/errors.middleware');

router.post('/signup', catchErrors(UsersController.create));
router.post('/signin', [AuthMiddleware.isAuthenticated, AuthMiddleware.canAccess], catchErrors(UsersController.show));

module.exports = router;
