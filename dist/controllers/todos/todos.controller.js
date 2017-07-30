"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const mongodb_1 = require("mongodb");
const models_1 = require("./../../models");
class TodosController {
    static index(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const todosQuery = models_1.Todo.find({});
            const todos = yield todosQuery.exec();
            console.log(todos);
            res.send({ todos });
        });
    }
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = new models_1.Todo(req.body);
            const savedTodo = yield todo.save();
            res.send({
                todo: savedTodo,
                message: 'Todo was created successfully!'
            });
        });
    }
    static show(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongodb_1.ObjectID.isValid(req.params.id)) {
                return res.status(404).send({ error: { type: 'NotFound', message: 'Todo not found' } });
            }
            const todo = yield models_1.Todo.findById(req.params.id);
            if (todo) {
                return res.send({ todo });
            }
            else {
                return res.status(404).send({ error: { type: 'NotFound', message: 'Todo not found' } });
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = lodash_1.default.pick(req.body, ['text', 'completed']);
            if (!mongodb_1.ObjectID.isValid(req.params.id)) {
                return res.status(404).send({ error: { type: 'NotFound', message: 'Todo not found' } });
            }
            if (lodash_1.default.isBoolean(body.completed) && body.completed) {
                body.completedAt = new Date().getTime();
            }
            else {
                body.completed = false;
                body.completedAt = null;
            }
            const todo = yield models_1.Todo.findByIdAndUpdate(req.params.id, { $set: body }, { new: true });
            if (todo) {
                return res.send({ todo, message: 'Todo was updated successfully!' });
            }
            else {
                return res.status(404).send({ error: { type: 'NotFound', message: 'Todo not found' } });
            }
        });
    }
    static remove(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongodb_1.ObjectID.isValid(req.params.id)) {
                return res
                    .status(404)
                    .send({ error: { type: 'NotFound', message: 'Todo not found' } });
            }
            const todo = yield models_1.Todo.findByIdAndRemove(req.params.id);
            if (todo) {
                return res.send({ todo, message: 'Todo has been removed successfully!' });
            }
            else {
                return res.status(404).send({ error: { type: 'NotFound', message: 'Todo not found' } });
            }
        });
    }
}
exports.TodosController = TodosController;
//# sourceMappingURL=todos.controller.js.map