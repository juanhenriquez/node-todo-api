"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expect_1 = require("expect");
const supertest_1 = require("supertest");
const mongodb_1 = require("mongodb");
const app_1 = require("./../app");
const models_1 = require("./../models");
const todos = [
    { _id: new mongodb_1.ObjectID(), text: 'First test todo' },
    { _id: new mongodb_1.ObjectID(), text: 'Second test todo' }
];
beforeEach(done => {
    models_1.Todo.remove({})
        .then(() => {
        return models_1.Todo.insertMany(todos);
    })
        .then(() => done());
});
describe('TODO\'s Routes', () => {
    describe('POST /todos', () => {
        it('should create a new todo', done => {
            const text = 'Text of my new todo';
            supertest_1.default(app_1.app)
                .post('/api/todos')
                .send({ text })
                .expect(200)
                .expect(res => {
                expect_1.default(res.body.todo).toBeA('object');
                expect_1.default(res.body.todo.text).toBe(text);
                expect_1.default(res.body.message).toBe('Todo was created successfully!');
            })
                .end((err, res) => {
                if (err)
                    return done(err);
                models_1.Todo.find({ text })
                    .then(todos => {
                    expect_1.default(todos.length).toBe(1);
                    expect_1.default(todos[0].text).toBe(text);
                    done();
                })
                    .catch(e => done(e));
            });
        });
        it('should not create new todo if body has invalid data', done => {
            supertest_1.default(app_1.app)
                .post('/api/todos')
                .send({})
                .expect(400)
                .expect(res => {
                expect_1.default(res.body.errors).toBeA('array');
            })
                .end((err, res) => {
                if (err)
                    return done(err);
                models_1.Todo.find()
                    .then(todos => {
                    expect_1.default(todos.length).toBe(2);
                    done();
                })
                    .catch(e => done(e));
            });
        });
    });
    describe('GET /todos', () => {
        it('should get all the todos', done => {
            supertest_1.default(app_1.app)
                .get('/api/todos')
                .expect(200)
                .expect(res => {
                expect_1.default(res.body.todos).toBeA('array');
                expect_1.default(res.body.todos.length).toBe(2);
            })
                .end(done);
        });
    });
    describe('GET /todos/:id', () => {
        it('should return todo document', done => {
            const id = todos[0]._id.toHexString();
            supertest_1.default(app_1.app)
                .get(`/api/todos/${id}`)
                .expect(200)
                .expect(res => {
                expect_1.default(res.body.todo.text).toBe(todos[0].text);
            })
                .end(done);
        });
        it('should return 404 if todo is not found', done => {
            const id = new mongodb_1.ObjectID().toHexString();
            supertest_1.default(app_1.app)
                .get(`/api/todos/${id}`)
                .expect(404)
                .expect(res => {
                expect_1.default(res.body.error.message).toBe('Todo not found');
            })
                .end(done);
        });
        it('should return 404 for non-object ids', done => {
            supertest_1.default(app_1.app)
                .get(`/api/todos/1234`)
                .expect(404)
                .expect(res => {
                expect_1.default(res.body.error.message).toBe('Todo not found');
            })
                .end(done);
        });
    });
    describe('PUT /todos/:id', () => {
        it('should update todo', done => {
            const id = todos[0]._id.toHexString();
            supertest_1.default(app_1.app)
                .put(`/api/todos/${id}`)
                .send({ text: 'updated text', completed: true })
                .expect(200)
                .expect(res => {
                expect_1.default(res.body.todo.text).toBe('updated text');
                expect_1.default(res.body.todo.completed).toBe(true);
                expect_1.default(res.body.todo.completedAt).toBeA('number');
            })
                .end(done);
        });
        it('should clear completedAt when todo is not completed', done => {
            const id = todos[0]._id.toHexString();
            supertest_1.default(app_1.app)
                .put(`/api/todos/${id}`)
                .send({ text: 'updated text', completed: false })
                .expect(200)
                .expect(res => {
                expect_1.default(res.body.todo.text).toBe('updated text');
                expect_1.default(res.body.todo.completed).toBe(false);
                expect_1.default(res.body.todo.completedAt).toNotExist();
            })
                .end(done);
        });
        it('should return 404 if todo is not found', done => {
            const id = new mongodb_1.ObjectID().toHexString();
            supertest_1.default(app_1.app)
                .put(`/api/todos/${id}`)
                .expect(404)
                .expect(res => {
                expect_1.default(res.body.error.message).toBe('Todo not found');
            })
                .end(done);
        });
        it('should return 404 for non-object ids', done => {
            supertest_1.default(app_1.app)
                .put(`/api/todos/1234`)
                .expect(404)
                .expect(res => {
                expect_1.default(res.body.error.message).toBe('Todo not found');
            })
                .end(done);
        });
    });
    describe('DELETE /todos/:id', () => {
        it('should remove a todo', done => {
            const id = todos[0]._id.toHexString();
            supertest_1.default(app_1.app)
                .delete(`/api/todos/${id}`)
                .expect(200)
                .expect(res => {
                expect_1.default(res.body.todo._id).toBe(id);
            })
                .end((err, response) => {
                if (err) {
                    return done(err);
                }
                models_1.Todo.findById(id)
                    .then(todo => {
                    expect_1.default(todo).toNotExist();
                    done();
                })
                    .catch(done);
            });
        });
        it('should return 404 if a todo is not found', done => {
            const id = new mongodb_1.ObjectID().toHexString();
            supertest_1.default(app_1.app)
                .delete(`/api/todos/${id}`)
                .expect(404)
                .expect(res => {
                expect_1.default(res.body.error.message).toBe('Todo not found');
            })
                .end(done);
        });
        it('should return 404 for non-object ids', done => {
            supertest_1.default(app_1.app)
                .get(`/api/todos/1234`)
                .expect(404)
                .expect(res => {
                expect_1.default(res.body.error.message).toBe('Todo not found');
            })
                .end(done);
        });
    });
});
//# sourceMappingURL=todos.test.js.map