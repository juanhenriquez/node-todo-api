const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const app = require('./../../server');
const Todo = require('./../../models/todo');

const todos = [
  { _id: new ObjectID(), text: 'First test todo'},
  { _id: new ObjectID(), text: 'Second test todo' }
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

  describe('GET /todos/:id', () => {
    it('should return todo document', done => {
      const id = todos[0]._id.toHexString();

      request(app)
        .get(`/api/todos/${id}`)
        .expect(200)
        .expect(res => {
          expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it('should return 404 if todo is not found', done => {
      const id = new ObjectID().toHexString();

      request(app)
        .get(`/api/todos/${id}`)
        .expect(404)
        .expect(res => {
          expect(res.body.message).toBe('Todo not found');
        })
        .end(done);
    });

    it('should return 404 for non-object ids', done => {
      request(app)
        .get(`/api/todos/1234`)
        .expect(404)
        .expect(res => {
          expect(res.body.message).toBe('Todo not found');
        })
        .end(done);
    });
  });
});
