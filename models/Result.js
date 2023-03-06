const Sequelize = require('sequelize');
const sequelize = require('./index');
const Rider = require('./Rider');
const Event = require('./Event');
const Event_Class = require('./Event_Class');
const Event_Session = require('./Event_Session');

const { DataTypes } = Sequelize;

const Result = sequelize.define('Event_Result', {
  id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  position: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
});

Event.hasMany(Result, {
  foreignKey: {
    name: 'event_id',
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
});

Result.belongsTo(Event, {
  foreignKey: {
    name: 'event_id',
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
});

Event_Class.hasMany(Result, {
  foreignKey: {
    name: 'class_id',
    type: DataTypes.CHAR(2),
    allowNull: false,
  },
});

Result.belongsTo(Event_Class, {
  foreignKey: {
    name: 'class_id',
    type: DataTypes.CHAR(2),
    allowNull: false,
  },
});

Event_Session.hasMany(Result, {
  foreignKey: {
    name: 'session_id',
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
});

Result.belongsTo(Event_Session, {
  foreignKey: {
    name: 'session_id',
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
});

Rider.hasMany(Result, {
  foreignKey: {
    name: 'rider_id',
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
});

Result.belongsTo(Rider, {
  foreignKey: {
    name: 'rider_id',
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
});

module.exports = Result;
