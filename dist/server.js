"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const db_1 = require("./db");
// import handlers
const { messageValidationErrors, notFoundErrors, forbiddenErrors } = require('./middlewares/errors.middleware');
// import and set main routes
const routes_1 = require("./routes/routes");
class Server {
    static bootstrap() {
        return new Server();
    }
    constructor() {
        this.app = express();
        this.config();
        this.api();
    }
    config() {
        // set middlewares
        this.app.use(bodyParser.json());
        // get the mongodb connection
        this.db = db_1.db;
        // error handlers
        this.app.use(notFoundErrors);
        this.app.use(forbiddenErrors);
        this.app.use(messageValidationErrors);
    }
    api() {
        console.log(routes_1.router);
        this.app.use('/api', routes_1.router);
    }
    getApp() {
        return this.app;
    }
    setPort(port) {
        this.port = port;
    }
    getPort() {
        return this.port;
    }
    setMongoUri(uri) {
        this.mongodb_uri = uri;
    }
    getMongoUri() {
        return this.mongodb_uri;
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map