'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    author: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Project.associate = function(models) {
    Project.belongsTo(models.User, {
      foreignKey: {
        field: 'UserId',
        allowNull: false
      }
    })
  };
  return Project;
};