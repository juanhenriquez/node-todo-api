"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const todo_schema_1 = require("./../schemas/todo.schema");
exports.Todo = mongoose.model('Todo', todo_schema_1.TodoSchema);
//# sourceMappingURL=todo.model.js.map