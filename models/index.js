const env = process.env.NODE_ENV
const dbConfig = require('../config/config.json')[env]
const {Sequelize, DataTypes} = require('sequelize')
console.log(env);
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
const TaskModel = require('./task.models')(sequelize, DataTypes);

sequelize.authenticate()
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  })



const db = {
  Sequelize,
  sequelize,
  models: {
    Task: TaskModel
  }
}
module.exports = db;