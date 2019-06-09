const config = require("../../config/database.js");
module.exports = {
  development: {
    username: config.username,
    password: config.password,
    database: config.database,
    host: config.host,
    dialect: "mysql"
  },
  test: {
    username: config.username,
    password: config.password,
    database: config.database,
    host: config.host,
    dialect: "mysql"
  },
  production: {
    username: config.username,
    password: config.password,
    database: config.database,
    host: config.host,
    dialect: "mysql"
  }
};
