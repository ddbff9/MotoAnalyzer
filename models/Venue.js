const Sequelize = require('sequelize');
const sequelize = require('./index');
const Event = require('./Event');
const Venue_Type = require('./Venue_Type');

const { gt, lte, ne, in: opIn, or } = Sequelize.Op;
const { DataTypes } = Sequelize;

const Venue = sequelize.define('Venue', {
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
  Open_Air: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  Street: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  City: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  State: {
    type: DataTypes.CHAR(2),
    allowNull: false,
  },
  Zipcode: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
});

Venue_Type.hasMany(Venue, {
  foreignKey: {
    name: 'Type_Id',
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
});

Venue.belongsTo(Venue_Type, {
  foreignKey: {
    name: 'Type_Id',
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
})

module.exports = Venue;
