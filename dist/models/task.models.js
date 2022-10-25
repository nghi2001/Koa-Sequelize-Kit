"use strict";

module.exports = function (sequelize, Type) {
  var Task = sequelize.define('Task', {
    name: {
      type: Type.STRING,
      allowNull: false
    },
    body: {
      type: Type.STRING,
      allowNull: false
    },
    state: {
      type: Type.STRING,
      allowNull: false,
      defaultValue: "TODO"
    }
  });
  return Task;
};