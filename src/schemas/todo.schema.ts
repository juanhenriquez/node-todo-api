import { Schema } from 'mongoose';

export const TodoSchema: Schema = new Schema({
  text: {
    type: String,
    required: [true, 'You must supply a title'],
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});