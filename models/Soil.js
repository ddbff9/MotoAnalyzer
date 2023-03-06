const Sequelize = require('sequelize');
const sequelize = require('./index');

const { DataTypes } = Sequelize;

const Soil = sequelize.define('Event_Soil', {
  id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
});

module.exports = Soil;