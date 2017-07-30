const expect = require('expect');
const request = require('supertest');
const { sign } = require('jsonwebtoken');
const { ObjectID } = require('mongodb');

const app = require('./../server');
const User = require('./../models/user');
const { users, populateUsers } = require('./seed/seed');

beforeEach(populateUsers);

describe('USERS\'s Routes', () => {

  describe('POST /signup', () => {
    it('should create a user', done => {
      const email = 'example@example.com';
      const password = '123acb!';

      request(app)
        .post('/api/users')
        .send({ email, password })
        .expect(200)
        .expect(res => {
          const { user, message } = res.body;
          expect(res.headers['x-auth']).toExist();
          expect(user._id).toExist();
          expect(user.email).toBe(email);
          expect(message).toEqual('The account was created successfully!');
        })
        .end(err => {
          if (err) return done(err);
          User.findOne({ email })
            .then(user => {
              expect(user).toExist();
              expect(user.password).toNotEqual(password);
              done();
            })
        });
    });

    it('should return validation errors if request is invalid', done => {
      request(app)
        .post('/api/users')
        .send({})
        .expect(400)
        .expect(res => {
          expect(res.body.errors).toBeAn(Array);
          expect(res.body.errors[0].path).toEqual('password');
          expect(res.body.errors[1].path).toEqual('email');
        })
        .end(done);
    });

    it('should not create a user if email is in use', done => {
      const email = 'juan@gmail.com';
      const password = '123acb!';

      request(app)
      .post('/api/users')
      .send({ email, password })
      .expect(400)
      .expect(res => {
        expect(res.body.errors).toBeAn(Array);
        expect(res.body.errors[0].kind).toEqual('unique');
        expect(res.body.errors[0].path).toEqual('email');
      })
      .end(done);
    });
  });

  describe('GET /getToken', () => {
    it('should return user if is authenticated and the token is valid', done => {
      const user = users[0];
      request(app)
        .get('/api/users/getToken')
        .set('x-auth', user.tokens[0].token)
        .expect(200)
        .expect(res => {
          const { _id, email } = res.body.user;
          expect(_id).toBe(user._id.toHexString());
          expect(email).toBe(user.email);
        })
        .end(done);
    });

    it('should return 401 if is not authenticated', done => {
      const user = users[0];
      request(app)
        .get('/api/users/getToken')
        .expect(401)
        .expect(res => {
          const { type, message } = res.body.error;
          expect(type).toBe('Unauthorized');
          expect(message).toBe('You need to login in order to access the requested data');
        })
        .end(done);
    });

    it('should return 403 if can not access to the requested data', done => {
      const userOne = users[0];
      const userTwo = users[1];
      const token = sign({ _id: userTwo._id, access: 'auth' }, 'abc123');
      request(app)
        .get('/api/users/getToken')
        .set('x-auth', token)
        .expect(403)
        .expect(res => {
          const { type, message } = res.body.error;
          expect(type).toBe('Forbidden');
          expect(message).toBe('You can access to the requested data');
        })
        .end(done);
    });

    it('should return 404 if user or token doesn exist', done => {
      const userOne = users[0];
      const token = sign({ _id: new ObjectID(), access: 'auth' }, 'abc123');
      request(app)
        .get('/api/users/getToken')
        .set('x-auth', token)
        .expect(404)
        .expect(res => {
          const { type, message } = res.body.error;
          expect(type).toBe('NotFound');
          expect(message).toBe('This account doesn\'t exist');
        })
        .end(done);
    });
  });
});