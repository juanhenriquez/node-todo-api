const db  = require('./../db/mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    minlength: 1,
    required: true,
    trim: true
  }
});

module.exports = db.model('User', UserSchema);
