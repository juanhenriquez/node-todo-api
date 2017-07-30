"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const models_1 = require("./../../models");
exports.todos = [
    { _id: new mongodb_1.ObjectID(), text: 'First test todo' },
    { _id: new mongodb_1.ObjectID(), text: 'Second test todo', completed: true, completedAt: 333 }
];
exports.populateTodos = done => {
    models_1.Todo
        .remove({})
        .then(() => models_1.Todo.insertMany(exports.todos))
        .then(() => done());
};
//# sourceMappingURL=seed.js.map