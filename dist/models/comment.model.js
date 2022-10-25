"use strict";

module.exports = function (sequelize, Type) {
  var Comment = sequelize.define('Comment', {
    content: {
      type: Type.STRING
    }
  });
  return Comment;
};