"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_controller_1 = require("./../controllers/todos/todos.controller");
// handlers
const errors_middleware_1 = require("./../middlewares/errors.middleware");
const router = express_1.Router();
exports.router = router;
router.get('/', errors_middleware_1.catchErrors(todos_controller_1.TodosController.index));
router.post('/', errors_middleware_1.catchErrors(todos_controller_1.TodosController.create));
router.get('/:id', errors_middleware_1.catchErrors(todos_controller_1.TodosController.show));
router.put('/:id', errors_middleware_1.catchErrors(todos_controller_1.TodosController.update));
router.delete('/:id', errors_middleware_1.catchErrors(todos_controller_1.TodosController.remove));
console.log(router);
//# sourceMappingURL=todos.route.js.map