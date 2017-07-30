import mongoose = require('mongoose');
import { Document, Model  } from 'mongoose';
import { db } from './../db';

import { Todo as TodoInterface } from './../interfaces/todo.interface';
import { TodoSchema } from './../schemas/todo.schema';

export interface TodoModel extends TodoInterface, Document { }

export interface TodoModelStatic extends Model<TodoModel> {}

export const Todo = mongoose.model<TodoModel, TodoModelStatic>('Todo', TodoSchema);