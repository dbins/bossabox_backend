module.exports = (sequelize, DataTypes) => {
  const Tags = sequelize.define("Tags", {
    tag: DataTypes.STRING,
    tool_id: DataTypes.INTEGER
  });
  Tags.associate = models => {
    Tags.belongsTo(models.Tools);
  };
  return Tags;
};
