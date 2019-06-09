const express = require("express");
const validate = require("express-validation");
const handle = require("express-async-handler");
const routes = express.Router();
const authMiddleware = require("./app/middlewares/auth");
const validators = require("./app/validators");
const UserController = require("./app/controllers/UserController");
const ToolsController = require("./app/controllers/ToolsController");

routes.post("/login", handle(UserController.login));
routes.post("/usuario", handle(UserController.cadastrar));
routes.get("/tools", handle(ToolsController.listar));
routes.get("/tools/:id", handle(ToolsController.detalhe));
//As rotas a partir daqui exigem autenticação
routes.use(authMiddleware);
routes.post("/tools", handle(ToolsController.cadastrar));
routes.put("/tools/:id", handle(ToolsController.atualizar));
routes.delete("/tools/:id", handle(ToolsController.remover));

module.exports = routes;
