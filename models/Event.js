const Sequelize = require('sequelize');
const sequelize = require('./index');
const Soil = require('./Soil');
const Venue = require('./Venue');

const { gt, lte, ne, in: opIn, or } = Sequelize.Op;
const { DataTypes } = Sequelize;

const Event = sequelize.define('Event', {
  Id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  Ama_Id: {
    type: DataTypes.STRING(45),
  },
  Type: {
    type: DataTypes.CHAR(2),
    allowNull: false,
  },
  Name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  Region: {
    type: DataTypes.STRING(3),
  },
  Round_Number: {
    type: DataTypes.INTEGER(11),
  },
  Triple_Crown: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  Gate_Drop: {
    type: DataTypes.DATE,
  },
  Whoop_Section: {
    type: DataTypes.INTEGER(11),
  },
  Sand_Section: {
    type: DataTypes.INTEGER(11),
  },
});

Venue.hasMany(Event, {
  foreignKey: {
    name: 'Venue_Id',
    type: DataTypes.INTEGER(11),
    allowNull: false
  },
});

Event.belongsTo(Venue, {
  foreignKey: {
    name: 'Venue_Id',
    type: DataTypes.INTEGER(11),
    allowNull: false
  },
});


Soil.hasMany(Event, {
  foreignKey: {
    name: 'Soil_Id',
    type: DataTypes.INTEGER(11),
    allowNull: false
  },
});

Event.belongsTo(Soil, {
  foreignKey: {
    name: 'Soil_Id',
    type: DataTypes.INTEGER(11),
    allowNull: false
  },
});

// sequelize.sync({ alter: true });
module.exports = Event;
