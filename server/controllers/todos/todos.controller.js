const { ObjectID } = require('mongodb');
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

  static async show(req, res, next) {
    if (!ObjectID.isValid(req.params.id)) {
      return res.status(404).send({ message: 'Todo not found' });
    }

    const todo = await Todo.findById(req.params.id);
    if (todo) {
      return res.send({ todo });
    } else {
      return res.status(404).send({ message: 'Todo not found' });
    }
  }

  static async remove(req, res, next) {
    if (!ObjectID.isValid(req.params.id)) {
      return res
        .status(404)
        .send({ message: 'Todo not found' });
    }

    const todo = await Todo.findByIdAndRemove(req.params.id);
    if (todo) {
      return res.send({ todo, message: 'Todo has been removed successfully!' });
    } else {
      return res.status(404).send({ message: 'Todo not found' });
    }
  }
}

module.exports = TodosController;
