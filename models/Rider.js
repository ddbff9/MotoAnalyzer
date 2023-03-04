const Sequelize = require('sequelize');
const sequelize = require('./index');
const { gt, lte, ne, in: opIn, or } = Sequelize.Op;
const { DataTypes } = Sequelize;

const Rider = sequelize.define('Rider', {
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
});

module.exports = Rider;
