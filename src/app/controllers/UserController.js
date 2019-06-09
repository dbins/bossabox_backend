const moment = require("moment");
const { User } = require("../models");

class UserController {
  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ message: "Senha incorreta" });
    }
    //Devolver o token
    return res.json({ user, token: user.generateToken(user) });
  }

  async cadastrar(req, res) {
    const { email, name, password } = req.body;
    const usuario = await User.findOne({ where: { email } });

    if (!usuario) {
      var novo_usuario = await User.create({
        name: name,
        email: email,
        password: password,
        created_at: moment().format("YYYY-MM-DD")
      });
      res.json(novo_usuario);
    } else {
      return res.status(403).json({ message: "Usuário já existe" });
    }
  }
}

module.exports = new UserController();
