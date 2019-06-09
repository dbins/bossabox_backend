const express = require("express");
const path = require("path");
var morgan = require("morgan");
const logger = require("./logger");

class App {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV;
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.express.use(express.urlencoded({ extended: false })); // Para receber dados de formularios
    this.express.use(express.json());
    this.express.use(morgan("combined", { stream: logger.stream }));
  }

  routes() {
    this.express.use(require("./routes"));
    this.express.use(function(req, res, next) {
      //res.status(404).send("File not found!");
      next(new Error("File not found"));
    });

    this.express.use(function(err, req, res, next) {
      logger.error(logger.combinedFormat(err, req, res));
      logger.error(err);
      res.status(err.status || 500).send(err);
    });
  }
}

module.exports = new App().express;
