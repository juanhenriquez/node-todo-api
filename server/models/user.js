const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const db  = require('./../db/mongoose');
const { Schema } = db;

const UserSchema = new Schema({
  email: {
    type: String,
    minlength: 1,
    required: [true, 'You must supply a email'],
    trim: true,
    unique: true,
    validate: {
      async: false,
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email address'
    }
  },
  password: {
    type: String,
    minlength: [6, 'This password is shorter than the minimum allowed length (6).'],
    required: [true, 'You must supply a password']
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  return _.pick(user, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString();

  return { token, access };
};

UserSchema.plugin(uniqueValidator, { message: 'Sorry, {VALUE} is already in use. Try a different email.'});

module.exports = db.model('User', UserSchema);
