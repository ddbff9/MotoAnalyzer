const Sequelize = require('sequelize');
const sequelize = require('./index');
const { DataTypes } = Sequelize;

const Soil = sequelize.define('Event_Soil', {
  Id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  Type: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
});

module.exports = Soil;
