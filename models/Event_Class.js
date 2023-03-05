const Sequelize = require('sequelize');
const sequelize = require('./index');

const { gt, lte, ne, in: opIn, or, and } = Sequelize.Op;
const { DataTypes } = Sequelize;

const Event_Class = sequelize.define('Event_Class', {
  Id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  Name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  Displacement: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
});

module.exports = Event_Class;
