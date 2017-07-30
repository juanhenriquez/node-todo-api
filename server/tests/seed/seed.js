const { ObjectID } = require('mongodb');
const { sign } = require('jsonwebtoken');

const Todo = require('./../../models/todo');
const User = require('./../../models/user');

const todos = [
  { _id: new ObjectID(), text: 'First test todo'},
  { _id: new ObjectID(), text: 'Second test todo', completed: true, completedAt: 333 }
];

const userOneID = new ObjectID();
const userTwoID = new ObjectID();
const users = [
  {
    _id: userOneID,
    email: 'juan@gmail.com',
    password: 'juanPass',
    tokens: [{ access: 'auth', token: sign({ _id: userOneID, access: 'auth' }, 'abc123') }]
  },
  {
    _id: userTwoID,
    email: 'moya@gmail.com',
    password: 'moyaPass'
  }
];

const populateTodos = done => {
  Todo
    .remove({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
}

const populateUsers = (done) => {
  User
    .remove({})
    .then(() => {
      const userOne = new User(users[0]).save();
      const userTwo = new User(users[1]).save();
      return Promise.all([userOne, userTwo]);
    })
    .then(() => done());
};

module.exports = {
  todos, populateTodos, users, populateUsers
}