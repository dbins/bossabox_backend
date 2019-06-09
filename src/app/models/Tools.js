module.exports = (sequelize, DataTypes) => {
  const Tools = sequelize.define("Tools", {
    title: DataTypes.STRING,
    link: DataTypes.STRING,
    description: DataTypes.STRING
  });
  Tools.associate = models => {
    Tools.hasMany(models.Tags);
  };
  return Tools;
};
