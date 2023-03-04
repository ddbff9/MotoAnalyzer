const Rider = require('./Rider');

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

printRiderId('Chase Sexton')