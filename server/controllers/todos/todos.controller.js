const Todo = require('./../../models/todo');

class TodosController {

  static async index(req, res, next) {
    const todosQuery = Todo.find({});
    const todos = await todosQuery.exec();
    res.send({ todos });
  }

  static async create(req, res, next) {
    const todo = new Todo(req.body);
    const savedTodo = await todo.save();
    res.send({
      todo: savedTodo,
      message: 'Todo was created successfully!'
    });
  }
}

module.exports = TodosController;
