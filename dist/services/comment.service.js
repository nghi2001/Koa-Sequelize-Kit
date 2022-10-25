"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _this = void 0;
var _require = require('../models'),
  models = _require.models;
var CommentModel = models.Comment;
var TaskService = require('./task.service');
exports.checkId = function (id) {
  if (!Number(id) || id < 0) {
    var error = new Error("id invalid");
    error.status = 400;
    throw error;
  }
  return true;
};
exports.checkTaskExist = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(taskId) {
    var task, error;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return TaskService.findOne(taskId);
          case 2:
            task = _context.sent;
            if (task) {
              _context.next = 7;
              break;
            }
            error = new Error("task not found");
            error.status = 200;
            throw error;
          case 7:
            console.log(!task);
            return _context.abrupt("return", true);
          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();
exports.getCommentsByTaskId = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
    var comments;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!_this.checkId(id)) {
              _context2.next = 5;
              break;
            }
            _context2.next = 3;
            return CommentModel.findAndCountAll({
              where: {
                TaskId: id
              }
            });
          case 3:
            comments = _context2.sent;
            return _context2.abrupt("return", comments);
          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}();
exports.checkCreateComment = function (comment) {
  var checkProp = comment.content && comment.TaskId;
  if (!checkProp) {
    var error = new Error("content or Taskid is missing");
    error.status = 422;
    throw error;
  }
  return true;
};
exports.createComment = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(comment) {
    var newComment;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!_this.checkCreateComment(comment)) {
              _context3.next = 7;
              break;
            }
            _context3.next = 3;
            return _this.checkTaskExist(comment.TaskId);
          case 3:
            _context3.next = 5;
            return CommentModel.create({
              content: comment.content,
              TaskId: comment.TaskId
            });
          case 5:
            newComment = _context3.sent;
            return _context3.abrupt("return", newComment);
          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}();
exports.deleteComment = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id) {
    var result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!_this.checkId(id)) {
              _context4.next = 5;
              break;
            }
            _context4.next = 3;
            return CommentModel.destroy({
              where: {
                id: id
              }
            });
          case 3:
            result = _context4.sent;
            return _context4.abrupt("return", result);
          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return function (_x4) {
    return _ref4.apply(this, arguments);
  };
}();
exports.checkContentComment = function (content) {
  console.log('content');
  if (!content || content.length == 0) {
    var error = new Error("content is missing");
    error.status = 422;
    throw error;
  }
  return true;
};
exports.updateComment = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id, content) {
    var result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!(_this.checkContentComment(content) && _this.checkId(id))) {
              _context5.next = 5;
              break;
            }
            _context5.next = 3;
            return CommentModel.update({
              content: content
            }, {
              where: {
                id: id
              }
            });
          case 3:
            result = _context5.sent;
            return _context5.abrupt("return", result);
          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return function (_x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}();