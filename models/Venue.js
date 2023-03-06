const Sequelize = require('sequelize');
const sequelize = require('./index');
const Venue_Type = require('./Venue_Type');

const { DataTypes } = Sequelize;

const Venue = sequelize.define('Venue', {
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
  open_air: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  street: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  state: {
    type: DataTypes.CHAR(2),
    allowNull: false,
  },
  zipcode: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
});

Venue_Type.hasMany(Venue, {
  foreignKey: {
    name: 'type_id',
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
});

Venue.belongsTo(Venue_Type, {
  foreignKey: {
    name: 'type_id',
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
})

module.exports = Venue;