const Sequelize = require('sequelize');
const sequelize = require('./index');
const Rider = require('./Rider');
const Event = require('./Event');
const Event_Class = require('./Event_Class');
const Event_Session = require('./Event_Session');

const { gt, lte, ne, in: opIn, or } = Sequelize.Op;
const { DataTypes } = Sequelize;

const Result = sequelize.define('Event_Result', {
  Id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  Position: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
});

Event.hasMany(Result, {
  foreignKey: {
    name: 'Event_Id',
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
});

Result.belongsTo(Event, {
  foreignKey: {
    name: 'Event_Id',
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
})

Event_Class.hasMany(Result, {
  foreignKey: {
    name: 'Class_Id',
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
});

Result.belongsTo(Event_Class, {
  foreignKey: {
    name: 'Class_Id',
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
})

Event_Session.hasMany(Result, {
  foreignKey: {
    name: 'Session_Id',
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
});

Result.belongsTo(Event_Session, {
  foreignKey: {
    name: 'Session_Id',
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
})

Rider.hasMany(Result, {
  foreignKey: {
    name: 'Rider_Id',
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
});

Result.belongsTo(Rider, {
  foreignKey: {
    name: 'Rider_Id',
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
})

module.exports = Result;
