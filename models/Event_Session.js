const Sequelize = require('sequelize');
const sequelize = require('./index');
const Result = require('./Result');

const { gt, lte, ne, in: opIn, or } = Sequelize.Op;
const { DataTypes } = Sequelize;

const Event_Session = sequelize.define('Event_Session', {
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
  Abbreviation: {
    type: DataTypes.CHAR(2),
    allowNull: false,
  },
});

module.exports = Event_Session;
