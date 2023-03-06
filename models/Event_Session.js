const Sequelize = require('sequelize');
const sequelize = require('./index');

const { DataTypes } = Sequelize;

const Event_Session = sequelize.define('Event_Session', {
  id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  abbreviation: {
    type: DataTypes.CHAR(2),
    allowNull: false,
  },
});

module.exports = Event_Session;