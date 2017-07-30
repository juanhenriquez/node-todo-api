import { sign, verify } from 'jsonwebtoken';
import { genSalt, hash } from 'bcryptjs';
import { ObjectID } from 'mongodb';

import { User } from './../../models';
import { Todo } from './../../models';

export const todos = [
  { _id: new ObjectID(), text: 'First test todo'},
  { _id: new ObjectID(), text: 'Second test todo', completed: true, completedAt: 333 }
]

export const populateTodos = done => {
  Todo
    .remove({})
    .then(() => Todo.insertMany(todos))
    .then(() => done());
}
