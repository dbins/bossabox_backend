const express = require("express");
const validate = require("express-validation");
const handle = require("express-async-handler");
const routes = express.Router();
const authMiddleware = require("./app/middlewares/auth");
const validatorUser = require("./app/validators/User");
const validatorLogin = require("./app/validators/Login");
const validatorTool = require("./app/validators/Tool");
const UserController = require("./app/controllers/UserController");
const ToolsController = require("./app/controllers/ToolsController");

routes.post("/login", validate(validatorLogin), handle(UserController.login));
routes.post(
  "/usuario",
  validate(validatorUser),
  handle(UserController.cadastrar)
);
routes.get("/tools", handle(ToolsController.listar));
routes.get("/tools/:id", handle(ToolsController.detalhe));
//As rotas a partir daqui exigem autenticação
routes.use(authMiddleware);
routes.post(
  "/tools",
  validate(ToolsController),
  handle(ToolsController.cadastrar)
);
routes.put(
  "/tools/:id",
  validate(ToolsController),
  handle(ToolsController.atualizar)
);
routes.delete("/tools/:id", handle(ToolsController.remover));

module.exports = routes;
