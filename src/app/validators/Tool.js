const Joi = require("joi");
module.exports = {
  // Pode ser tambem query ou params para validar outros tipos de entradas
  body: {
    title: Joi.string()
      .required()
      .options({ language: { any: { required: "Title não informado" } } }),
    link: Joi.string()
      .required()
      .options({ language: { any: { required: "Link não informado" } } }),
    description: Joi.string()
      .required()
      .options({
        language: { any: { required: "Description não informado" } }
      }),
    tags: Joi.array()
      .items(Joi.string())
      .options({ language: { any: { required: "Tags não informadas" } } })
  }
};
