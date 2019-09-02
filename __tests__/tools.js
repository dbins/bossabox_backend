const app = require("../src/server");
const request = require("supertest");
const faker = require("faker");
const req = request(app);

describe("GET /tools ", () => {
  test("Deve retornar um array de tools", async () => {
    const response = await req.get("/tools").set("Accept", "application/json");
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: "Teste"
        })
      ])
    );
    expect(response.statusCode).toBe(200);
  });
});

describe("POST /tools", () => {
  test("Deve cadastrar uma nova tool", async () => {
    //Criar um usuário
    const fake_name = faker.name.findName();
    const fake_email = faker.internet.email();
    const fake_password = faker.internet.password();
    //Criando o usuario
    const newUser = await req
      .post("/usuario")
      .set("Accept", "application/json")
      .send({
        name: fake_name,
        email: fake_email,
        password: fake_password
      });

    const loginUser = await req
      .post("/login")
      .set("Accept", "application/json")
      .send({
        name: fake_name,
        email: fake_email,
        password: fake_password
      });
    const token = loginUser.body.token;

    const fake_link = faker.internet.url();
    const newTool = await req
      .post("/tools")
      .set({ Accept: "application/json", Authorization: "Bearer " + token })
      .send({
        title: "Teste",
        link: fake_link,
        description: "Teste do Bins",
        tags: ["tag1", "tag2", "tag3"]
      });

    expect(newTool.body).toHaveProperty("id");
    expect(newTool.body.title).toBe("Teste");
    expect(newTool.statusCode).toBe(200);
  });
});

describe("UPDATE /tools/1", () => {
  test("Atualizar uma Tool", async () => {
    //Criar um usuário
    const fake_name = faker.name.findName();
    const fake_email = faker.internet.email();
    const fake_password = faker.internet.password();
    //Criando o usuario
    const newUser = await req
      .post("/usuario")
      .set("Accept", "application/json")
      .send({
        name: fake_name,
        email: fake_email,
        password: fake_password
      });

    const loginUser = await req
      .post("/login")
      .set("Accept", "application/json")
      .send({
        name: fake_name,
        email: fake_email,
        password: fake_password
      });
    const token = loginUser.body.token;

    const fake_link = faker.internet.url();
    const fake_link2 = faker.internet.url();

    const newTool = await req
      .post("/tools")
      .set({ Accept: "application/json", Authorization: "Bearer " + token })
      .send({
        title: "Novo registro",
        link: fake_link,
        description: "Teste do Bins",
        tags: ["tag1", "tag2", "tag3"]
      });

    const updatedTool = await req
      .put(`/tools/${newTool.body.id}`)
      .set({ Accept: "application/json", Authorization: "Bearer " + token })
      .send({
        title: "Registro atualizado",
        link: fake_link2,
        description: "Teste do Bins",
        tags: ["tag1", "tag2", "tag3"]
      });
    //expect(updatedTool.body.message).toBe("Registro atualizado");
    //expect(updatedTool.body.tool).toHaveProperty("id");
    expect(updatedTool.body).toHaveProperty("id");
    expect(updatedTool.statusCode).toBe(200);
  });
});

describe("DELETE /tools/1", () => {
  test("Deve remover uma Tool", async () => {
    //Criar um usuário
    const fake_name = faker.name.findName();
    const fake_email = faker.internet.email();
    const fake_password = faker.internet.password();
    //Criando o usuario
    const newUser = await req
      .post("/usuario")
      .set("Accept", "application/json")
      .send({
        name: fake_name,
        email: fake_email,
        password: fake_password
      });

    const loginUser = await req
      .post("/login")
      .set("Accept", "application/json")
      .send({
        name: fake_name,
        email: fake_email,
        password: fake_password
      });
    const token = loginUser.body.token;

    const fake_link = faker.internet.url();
    const newTool = await req
      .post("/tools")
      .set({ Accept: "application/json", Authorization: "Bearer " + token })
      .send({
        title: "Registro para excluir",
        link: fake_link,
        description: "Teste do Bins",
        tags: ["tag1", "tag2", "tag3"]
      });
    const removedTool = await req
      .delete(`/tools/${newTool.body.id}`)
      .set({ Accept: "application/json", Authorization: "Bearer " + token });
    expect(removedTool.body).toEqual({ message: "Registro excluido" });
    expect(removedTool.statusCode).toBe(200);
  });
});
