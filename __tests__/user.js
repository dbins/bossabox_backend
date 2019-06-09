const app = require("../src/server");
const request = require("supertest");
const faker = require("faker");
const req = request(app);

//cadastrar

describe("POST /usuario", () => {
  test("Deve cadastrar um novo usuario", async done => {
    const fake_name = faker.name.findName();
    const fake_email = faker.internet.email();
    const fake_password = faker.internet.password();

    const newUser = await req
      .post("/usuario")
      .set("Accept", "application/json")
      .send({
        name: fake_name,
        email: fake_email,
        password: fake_password
      });

    // Conferir
    expect(newUser.body).toHaveProperty("id");
    expect(newUser.body.name).toBe(fake_name);
    expect(newUser.statusCode).toBe(200);
    done();
  });
});

//login
describe("POST /login", () => {
  test("Deve logar o usuario e receber um token", async done => {
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

    // Conferindo o retorno
    expect(loginUser.body.user).toHaveProperty("id");
    expect(loginUser.body.user.name).toBe(fake_name);
    expect(loginUser.statusCode).toBe(200);
    expect(loginUser.body).toHaveProperty("token");
    done();
  });
});
