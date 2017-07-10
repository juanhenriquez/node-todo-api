const _ = require('lodash');
const { ObjectID } = require('mongodb');
const User = require('./../../models/user');

class UsersController {
  static async create(req, res, next) {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);
    const authData = user.generateAuthToken();

    // add a new token to the user's token list
    user.tokens.push(authData);

    // save the user in the db
    await user.save();

    return res
      .header('x-auth', authData.token)
      .send({ user: user.toJSON(), message: "The account was created successfully!" });
  }

  static async show(req, res, next) {
    const { user, token } = req;
    if (user) {
      return res
        .header('x-auth', token)
        .send({ user });
    } else {
      return res
        .status(403)
        .send({ error: { type: 'Unauthorized', message: 'You need to login in order to access the requested data' }})
    }
  }
}

module.exports = UsersController;
