const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

sequelize.authenticate().then(()=>{
  console.log("Connection successful!");
}).catch((err)=>{
  console.log("Error connecting to database!");
});

module.exports = sequelize;