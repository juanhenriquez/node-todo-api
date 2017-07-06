const expect = require('expect');
const request = require('supertest');

const app = require('./../../server');
const Todo = require('./../../models/todo');

const todos = [
  { text: 'First test todo'},
  { text: 'Second test todo' }
]

beforeEach(done => {
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
});

describe('TODO\'s Routes', () => {

  describe('POST /todos', () => {
    it('should create a new todo', done => {
      const text = 'Text of my new todo';

      request(app)
        .post('/api/todos')
        .send({ text })
        .expect(200)
        .expect(res => {
          expect(res.body.todo).toBeA('object');
          expect(res.body.todo.text).toBe(text);
          expect(res.body.message).toBe('Todo was created successfully!');
        })
        .end((err, res) => {
          if (err) return done(err);
          Todo.find({ text })
            .then(todos => {
              expect(todos.length).toBe(1);
              expect(todos[0].text).toBe(text);
              done();
            })
            .catch(e => done(e));
        });
    });

    it('should not create new todo if body has invalid data', done => {

      request(app)
        .post('/api/todos')
        .send({})
        .expect(400)
        .expect(res => {
          expect(res.body.errors).toBeA('array');
        })
        .end((err, res) => {
          if (err) return done(err);

          Todo.find()
            .then(todos => {
              expect(todos.length).toBe(2);
              done();
            })
            .catch(e => done(e));
        });
    });
  });

  describe('GET /todos', () => {
    it('should get all the todos', done => {
      request(app)
        .get('/api/todos')
        .expect(200)
        .expect(res => {
          expect(res.body.todos).toBeA('array');
          expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });

  });
});
