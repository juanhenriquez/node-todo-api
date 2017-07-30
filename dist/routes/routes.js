"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_route_1 = require("./todos.route");
const users_route_1 = require("./users.route");
const router = express_1.Router();
exports.router = router;
router.use('/todos', todos_route_1.router);
router.use('/users', users_route_1.router);
console.log(router);
//# sourceMappingURL=routes.js.map