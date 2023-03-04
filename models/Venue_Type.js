const Sequelize = require('sequelize');
const sequelize = require('./index');
const { DataTypes } = Sequelize;

const Venue_Type = sequelize.define('Venue_Type', {
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

module.exports = Venue_Type;
