import _ from 'lodash';
import { Schema } from 'mongoose';
import { genSalt, hash } from 'bcryptjs';
import { isEmail } from 'validator';
import { sign } from 'jsonwebtoken';
import * as mongooseUniqueValidator from 'mongoose-unique-validator';

export const UserSchema: Schema = new Schema({
  email: {
    type: String,
    minlength: 1,
    required: [true, 'You must supply a email'],
    trim: true,
    unique: true,
    validate: {
      async: false,
      validator: isEmail,
      message: '{VALUE} is not a valid email address'
    }
  },
  password: {
    type: String,
    minlength: [6, 'This password is shorter than the minimum allowed length (6).'],
    required: [true, 'You must supply a password']
  },
  createdAt: Date,
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
  const token = sign({ _id: user._id.toHexString(), access }, 'abc123').toString();

  return { token, access };
};

UserSchema.statics.findByIdAndToken = function (id, token) {
  const User = this;
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findById(id);
      if (user) { 
        const isCorrectUser = user.tokens.filter(t => {
          return (t.token === token && t.access === 'auth') ? true : false;
        });

        if (isCorrectUser.length) {
          resolve(user.toJSON());
        } else {
          reject({ type: 'Forbidden', message: 'You can access to the requested data' });
        }
      } else {
        reject({ type: 'NotFound', message: 'This account doesn\'t exist' });
      }
    } catch (findByIdError) {
      reject({ type: 'NotFound', message: 'This account doesn\'t exist' });
    }

  });
};

// generate password
UserSchema.pre('save', function (next) {
  const user = this;
  if (user.isModified('password')) {
    genSalt(10, (err, salt) => {
      hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// set the date of registration
UserSchema.pre('save', function (next) {
  const user = this;
  if (!user.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

// Plugins
UserSchema.plugin(mongooseUniqueValidator, { 
  message: 'Sorry, {VALUE} is already in use. Try a different email.'
});