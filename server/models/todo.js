const db  = require('./../db/mongoose');
const { Schema } = db;

const todoSchema = new Schema({
  text: {
    type: String,
    required: 'You must supply an title',
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

module.exports = db.model('Todo', todoSchema);
