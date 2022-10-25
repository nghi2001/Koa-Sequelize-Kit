"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var CommentService = require('../services/comment.service');
exports.findAllComment = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx, next) {
    var taskid, comments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            taskid = ctx.params.taskid;
            _context.next = 4;
            return CommentService.getCommentsByTaskId(taskid);
          case 4:
            comments = _context.sent;
            ctx.body = comments;
            _context.next = 11;
            break;
          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            ctx.app.emit('error', _context.t0, ctx);
          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.createComment = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(ctx) {
    var _ctx$request$body, content, TaskId, comment;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _ctx$request$body = ctx.request.body, content = _ctx$request$body.content, TaskId = _ctx$request$body.TaskId;
            _context2.prev = 1;
            _context2.next = 4;
            return CommentService.createComment({
              content: content,
              TaskId: TaskId
            });
          case 4:
            comment = _context2.sent;
            ctx.status = 201;
            ctx.body = comment;
            _context2.next = 12;
            break;
          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](1);
            ctx.app.emit('error', _context2.t0, ctx);
          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 9]]);
  }));
  return function (_x3) {
    return _ref2.apply(this, arguments);
  };
}();
exports["delete"] = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(ctx) {
    var id, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            id = ctx.params.id;
            _context3.next = 4;
            return CommentService.deleteComment(id);
          case 4:
            result = _context3.sent;
            if (result == 0) {
              ctx["throw"](404, 'id not found');
            }
            return _context3.abrupt("return", ctx.body = result);
          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            ctx.app.emit('error', _context3.t0, ctx);
          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 9]]);
  }));
  return function (_x4) {
    return _ref3.apply(this, arguments);
  };
}();
exports.update = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(ctx) {
    var id, content, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id = ctx.params.id;
            content = ctx.request.body.content;
            _context4.next = 5;
            return CommentService.updateComment(id, content);
          case 5:
            result = _context4.sent;
            if (result == 0) {
              ctx["throw"](404, 'id not found');
            }
            return _context4.abrupt("return", ctx.body = result);
          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](0);
            ctx.app.emit('error', _context4.t0, ctx);
          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 10]]);
  }));
  return function (_x5) {
    return _ref4.apply(this, arguments);
  };
}();