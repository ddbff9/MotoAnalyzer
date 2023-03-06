const Sequelize = require('sequelize');
const sequelize = require('./index');
const Soil = require('./Soil');
const Venue = require('./Venue');

const { DataTypes } = Sequelize;

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  ama_id: {
    type: DataTypes.STRING(45),
  },
  type: {
    type: DataTypes.CHAR(2),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  region: {
    type: DataTypes.STRING(3),
  },
  round_number: {
    type: DataTypes.INTEGER(11),
  },
  triple_crown: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  gate_drop: {
    type: DataTypes.DATE,
  },
  whoop_section: {
    type: DataTypes.INTEGER(11),
  },
  sand_section: {
    type: DataTypes.INTEGER(11),
  },
});

Venue.hasMany(Event, {
  foreignKey: {
    name: 'venue_id',
    type: DataTypes.INTEGER(11),
    allowNull: false
  },
});

Event.belongsTo(Venue, {
  foreignKey: {
    name: 'venue_id',
    type: DataTypes.INTEGER(11),
    allowNull: false
  },
});


Soil.hasMany(Event, {
  foreignKey: {
    name: 'soil_id',
    type: DataTypes.INTEGER(11),
    allowNull: false
  },
});

Event.belongsTo(Soil, {
  foreignKey: {
    name: 'soil_id',
    type: DataTypes.INTEGER(11),
    allowNull: false
  },
});

// sequelize.sync({ alter: true });
module.exports = Event;