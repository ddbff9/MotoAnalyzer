const Sequelize = require('sequelize');
const sequelize = require('./index');

const { DataTypes } = Sequelize;

const Rider = sequelize.define('Rider', {
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
});

module.exports = Rider;