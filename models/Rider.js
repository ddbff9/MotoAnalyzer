const Sequelize = require('sequelize');
const sequelize = require('./index');
const { gt, lte, ne, in: opIn, or } = Sequelize.Op;
const { DataTypes } = Sequelize;

const Rider = sequelize.define(
  'Rider',
  {
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
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

async function getRiders() {
  try {
    let riders = await Rider.findAll();
    riders.forEach((rider) => {
      console.log(rider.toJSON());
    });
  } catch (err) {
    throw err;
  }
}

async function getRiderId(name) {
  try {
    let riderId = await Rider.findAll({ attributes: ['Id'], where: { Name: name }});
    return riderId[0]['Id'];
  } catch (err) {
    throw err;
  }
}

let printRiderId = async(name)=>{
  let riderId = await getRiderId(name);
  console.log('Rider Id:', riderId);
};

module.exports= Rider;
