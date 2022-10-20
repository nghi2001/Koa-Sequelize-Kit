const env = process.env.NODE_ENV
const dbConfig = require('../config/config.json')[env]
const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

const TaskModel = require('./task.models')(sequelize, DataTypes);
const CommentModel = require('./comment.model')(sequelize, DataTypes);

sequelize.authenticate()
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  })

TaskModel.hasMany(CommentModel, { as: 'comments', onDelete: "CASCADE" })
CommentModel.belongsTo(TaskModel)

const db = {
  Sequelize,
  sequelize,
  models: {
    Task: TaskModel,
    Comment: CommentModel
  }
}
module.exports = db;