"use strict";

var env = process.env.NODE_ENV;
var dbConfig = require('../config/config.json')[env];
var _require = require('sequelize'),
  Sequelize = _require.Sequelize,
  DataTypes = _require.DataTypes;
var sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
var TaskModel = require('./task.models')(sequelize, DataTypes);
var CommentModel = require('./comment.model')(sequelize, DataTypes);
sequelize.authenticate().then(function () {
  console.log("database connected");
})["catch"](function (err) {
  console.log(err);
});
TaskModel.hasMany(CommentModel, {
  as: 'comments',
  onDelete: "CASCADE"
});
CommentModel.belongsTo(TaskModel);
var db = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  models: {
    Task: TaskModel,
    Comment: CommentModel
  }
};
module.exports = db;