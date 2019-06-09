const express = require("express");
const path = require("path");

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
  }

  routes() {
    this.express.use(require("./routes2"));
  }
}

module.exports = new App().express;
