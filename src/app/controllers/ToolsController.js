const moment = require("moment");
const util = require("../util/index");
const { Tools, Tags } = require("../models");

class ToolsController {
  async listar(req, res) {
    if (req.query.tag) {
      const resultados = await Tools.findAll({
        where: { tag: req.query.tag },
        include: [
          {
            model: Tags,
            attributes: ["tag"]
          }
        ]
      });
      res.json(util.mapResult(resultados));
    } else {
      try {
        //const resultados = await sequelize.query(
        //  "SELECT Tools.id, Tools.title, Tools.link, Tools.description, GROUP_CONCAT(Tags.tag) AS tags FROM Tools LEFT JOIN Tags ON Tools.id = Tags.tool_id GROUP BY Tools.id, Tools.title, Tools.link, Tools.description",
        //  { type: sequelize.QueryTypes.SELECT }
        //);

        const resultados = await Tools.findAll({
          include: [
            {
              model: Tags,
              attributes: ["tag"]
            }
          ],
          raw: false,
          attributes: ["id", "title", "link", "description"]
          //group: ["id", "title", "link", "description"]
        });

        res.json(util.mapResult(resultados));
      } catch (err) {
        res.json([]);
      }
    }
  }

  async cadastrar(req, res) {
    const { title, link, description, tags } = req.body;
    const tool = await Tools.findOne({ where: { link } });

    if (!tool) {
      var new_tool = await Tools.create({
        title: title,
        link: link,
        description: description
      });

      const tool_id = new_tool.id;
      console.log(tool_id);
      for (var x = 0; x < tags.length; x++) {
        var item = tags[x];
        await Tags.create({
          tag: item,
          tool_id: tool_id
        });
      }
      const resultados = await Tools.findOne({
        where: { id: tool_id },
        include: [
          {
            model: Tags,
            attributes: ["tag"]
          }
        ]
      });
      res.json(util.mapResult(resultados));
    } else {
      return res.status(400).json({ message: "Tool já existe" });
    }
  }

  async atualizar(req, res) {
    const { title, link, description, tags } = req.body;
    const tool = await Tools.findOne({ where: { id: req.params.id } });
    if (tool) {
      var update_tool = await Tools.update(
        {
          title: title,
          link: link,
          description: description
        },
        { where: { id: req.params.id } }
      );
      await Tags.destroy({ where: { tool_id: req.params.id } });
      for (var x = 0; x < tags.length; x++) {
        var item = tags[x];
        await Tags.create({
          tag: item,
          tool_id: req.params.id,
          created_at: moment().format("YYYY-MM-DD")
        });
      }
      const tool = await Tools.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: Tags,
            attributes: ["tag"]
          }
        ]
      });
      const detail = util.mapResult(tool);
      res.json({ detail, message: "Registro atualizado" });
    } else {
      return res.status(400).json({ message: "ID não localizado" });
    }
  }

  async remover(req, res) {
    const tool = await Tools.findOne({ where: { id: req.params.id } });
    if (tool) {
      await Tools.destroy({ where: { id: req.params.id } });
      await Tags.destroy({ where: { tool_id: req.params.id } });
      return res.status(200).json({ message: "Registro excluido" });
    } else {
      return res.status(400).json({ message: "ID não localizado" });
    }
  }

  async detalhe(req, res) {
    const tool = await Tools.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Tags,
          attributes: ["tag"]
        }
      ]
    });
    if (tool) {
      const detail = util.mapResult(tool);
      return res.status(200).json({ detail });
    } else {
      return res.status(400).json({ error: "ID não localizado" });
    }
  }
}

module.exports = new ToolsController();
