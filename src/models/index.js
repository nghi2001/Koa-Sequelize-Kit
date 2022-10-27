const env = process.env.NODE_ENV
// const dbConfig = require('../config/config')
import dbConfig from '../config/config'
import { Sequelize, DataTypes } from 'sequelize'
console.log(process.env.USER)
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig)

import taskModel from './task.models'
import commentModel from './comment.model'
import userModel from './user.model'
const UserModel = userModel(sequelize, DataTypes)
const TaskModel = taskModel(sequelize, DataTypes)
const CommentModel = commentModel(sequelize, DataTypes)

sequelize.authenticate()
  .then(() => {
    console.log("database connected")
  })
  .catch((err) => {
    console.log(err)
  })
UserModel.hasMany(TaskModel, {as: 'tasks', onDelete: "CASCADE"})
UserModel.hasMany(CommentModel, {as: 'comments', onDelete: "CASCADE"})
TaskModel.belongsTo(UserModel)
TaskModel.hasMany(CommentModel, { as: 'comments', onDelete: "CASCADE" })
CommentModel.belongsTo(TaskModel)
CommentModel.belongsTo(UserModel)

const db = {
  Sequelize,
  sequelize,
  models: {
    Task: TaskModel,
    Comment: CommentModel,
    User: UserModel
  }
}

export default db