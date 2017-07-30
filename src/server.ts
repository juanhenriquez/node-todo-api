import * as express from 'express';
import * as bodyParser from 'body-parser';
import mongoose = require('mongoose');
import { db } from './db';

// import handlers
const { messageValidationErrors, notFoundErrors, forbiddenErrors } = require('./middlewares/errors.middleware');

// import and set main routes
import { router } from './routes/routes';

export class Server {

  public app: express.Application;
  private port: string;
  private db: mongoose.Connection;
  private mongodb_uri: string;

  public static bootstrap(): Server {
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
    this.db = db;

    // error handlers
    this.app.use(notFoundErrors);
    this.app.use(forbiddenErrors);
    this.app.use(messageValidationErrors);
  }

  api() {
    console.log(router);
    this.app.use('/api', router);
  }

  getApp () {
    return this.app;
  }

  setPort (port: string) {
    this.port = port;
  }

  getPort () {
    return this.port;
  }

  setMongoUri (uri: string) {
    this.mongodb_uri = uri;
  }

  getMongoUri () {
    return this.mongodb_uri;
  }
}
