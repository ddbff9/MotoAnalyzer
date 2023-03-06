const Sequelize = require('sequelize');
const sequelize = require('./index');

const { DataTypes } = Sequelize;

const Event_Class = sequelize.define('Event_Class', {
  id: {
    type: DataTypes.CHAR(2),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  displacement: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
});

module.exports = Event_Class;