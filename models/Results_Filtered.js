const Sequelize = require('sequelize');
const sequelize = require('./index');

const { gt, lte, ne, in: opIn, or } = Sequelize.Op;
const { DataTypes } = Sequelize;

const Results_Filtered = sequelize.define(
  'Results_Filtered',
  {
    Rider_Name: {
      type: DataTypes.STRING(45),
    },
    Event_Id: {
      type: DataTypes.INTEGER(11),
    },
    Whoops: {
      type: DataTypes.INTEGER(11),
    },
    Sand: {
      type: DataTypes.INTEGER(11),
    },
    Round: {
      type: DataTypes.INTEGER(11),
    },
    Location: {
      type: DataTypes.STRING(49),
    },
    Open_Air: {
      type: DataTypes.BOOLEAN,
    },
    Venue_Types: {
      type: DataTypes.STRING(45),
    },
    Soil_Type: {
      type: DataTypes.STRING(45),
    },
    Session_Type: {
      type: DataTypes.STRING(45),
    },
    Position: {
      type: DataTypes.INTEGER(11),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Results_Filtered;
