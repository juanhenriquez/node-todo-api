"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("./../middlewares/auth.middleware");
// controller
const users_controller_1 = require("./../controllers/user/users.controller");
// handlers
const errors_middleware_1 = require("./../middlewares/errors.middleware");
const router = express_1.Router();
exports.router = router;
router.post('/signup', errors_middleware_1.catchErrors(users_controller_1.UsersController.create));
router.post('/signin', [auth_middleware_1.isAuthenticated, auth_middleware_1.canAccess], errors_middleware_1.catchErrors(users_controller_1.UsersController.show));
//# sourceMappingURL=users.route.js.map