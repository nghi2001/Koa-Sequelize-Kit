"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _this = void 0;
const {
  models
} = require('../models');
const CommentModel = models.Comment;
const TaskService = require('./task.service');
exports.checkId = id => {
  if (!Number(id) || id < 0) {
    let error = new Error("id invalid");
    error.status = 400;
    throw error;
  }
  return true;
};
exports.checkTaskExist = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)(function* (taskId) {
    let task = yield TaskService.findOne(taskId);
    if (!task) {
      let error = new Error("task not found");
      error.status = 200;
      throw error;
    }
    console.log(!task);
    return true;
  });
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();
exports.getCommentsByTaskId = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)(function* (id) {
    if (_this.checkId(id)) {
      let comments = yield CommentModel.findAndCountAll({
        where: {
          TaskId: id
        }
      });
      return comments;
    }
  });
  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}();
exports.checkCreateComment = comment => {
  let checkProp = comment.content && comment.TaskId;
  if (!checkProp) {
    let error = new Error("content or Taskid is missing");
    error.status = 422;
    throw error;
  }
  return true;
};
exports.createComment = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)(function* (comment) {
    if (_this.checkCreateComment(comment)) {
      yield _this.checkTaskExist(comment.TaskId);
      let newComment = yield CommentModel.create({
        content: comment.content,
        TaskId: comment.TaskId
      });
      return newComment;
    }
  });
  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}();
exports.deleteComment = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)(function* (id) {
    if (_this.checkId(id)) {
      let result = yield CommentModel.destroy({
        where: {
          id: id
        }
      });
      return result;
    }
  });
  return function (_x4) {
    return _ref4.apply(this, arguments);
  };
}();
exports.checkContentComment = content => {
  console.log('content');
  if (!content || content.length == 0) {
    let error = new Error("content is missing");
    error.status = 422;
    throw error;
  }
  return true;
};
exports.updateComment = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2.default)(function* (id, content) {
    if (_this.checkContentComment(content) && _this.checkId(id)) {
      let result = yield CommentModel.update({
        content: content
      }, {
        where: {
          id: id
        }
      });
      return result;
    }
  });
  return function (_x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}();