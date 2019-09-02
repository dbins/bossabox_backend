const hooks = require("hooks");
const faker = require("faker");

var codigo_tool = 58;
var jwt = {
  token: null
};
var usuario = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
};
var tool = {
  title: faker.commerce.productName(),
  link: faker.internet.url(),
  description: "Teste do Bins",
  tags: ["tag1", "tag2", "tag3"]
};

var tool_atualizada = {
  title: faker.commerce.productName(),
  link: faker.internet.url(),
  description: "Teste do Bins",
  tags: ["tag1", "tag2", "tag3"]
};

hooks.after(
  "Usuario > Login > Faz o login do usuário, retornando um token",
  function(transaction) {
    jwt.token = JSON.parse(transaction.real.body).token;
  }
);

hooks.afterEach(function(transaction) {
  console.log(transaction.name);
});

hooks.beforeEach(function(transaction) {
  if (jwt.token != null) {
    transaction.request.headers["Authorization"] = `Bearer ${jwt.token}`;
  }
});

hooks.before("Usuario > Usuario > Criar Usuario", function(transaction) {
  transaction.request.body = JSON.stringify(usuario);
});

hooks.before("Tools > Tools > Criar Tools", function(transaction) {
  //transaction.skip = true;
  transaction.request.body = JSON.stringify(tool);
});

hooks.after("Tools > Tools > Criar Tools", function(transaction) {
  console.log(transaction.real.body);
  codigo_tool = JSON.parse(transaction.real.body).id;
});

hooks.before("Tool > Tool > Detalhe Tool", function(transaction) {
  //transaction.skip = true;
  let url = transaction.fullPath;
  transaction.fullPath = url.replace("1", codigo_tool);
  console.log(transaction.fullPath);
});

hooks.before("Tool > Tool > Atualizar tool", function(transaction) {
  //transaction.skip = true;
  transaction.request.body = JSON.stringify(tool_atualizada);
  let url = transaction.fullPath;
  transaction.fullPath = url.replace("1", codigo_tool);
});

hooks.before("Tool > Tool > Excluir Tool", function(transaction) {
  //transaction.skip = true;
  let url = transaction.fullPath;
  transaction.fullPath = url.replace("1", codigo_tool);
});
