"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
let CommentService = require('../services/comment.service');
exports.findAllComment = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)(function* (ctx, next) {
    try {
      let taskid = ctx.params.taskid;
      let comments = yield CommentService.getCommentsByTaskId(taskid);
      ctx.body = comments;
    } catch (error) {
      ctx.app.emit('error', error, ctx);
    }
  });
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.createComment = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)(function* (ctx) {
    let {
      content,
      TaskId
    } = ctx.request.body;
    try {
      let comment = yield CommentService.createComment({
        content,
        TaskId
      });
      ctx.status = 201;
      ctx.body = comment;
    } catch (error) {
      ctx.app.emit('error', error, ctx);
    }
  });
  return function (_x3) {
    return _ref2.apply(this, arguments);
  };
}();
exports.delete = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)(function* (ctx) {
    try {
      let id = ctx.params.id;
      let result = yield CommentService.deleteComment(id);
      if (result == 0) {
        ctx.throw(404, 'id not found');
      }
      return ctx.body = result;
    } catch (error) {
      ctx.app.emit('error', error, ctx);
    }
  });
  return function (_x4) {
    return _ref3.apply(this, arguments);
  };
}();
exports.update = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)(function* (ctx) {
    try {
      let id = ctx.params.id;
      let {
        content
      } = ctx.request.body;
      let result = yield CommentService.updateComment(id, content);
      if (result == 0) {
        ctx.throw(404, 'id not found');
      }
      return ctx.body = result;
    } catch (error) {
      ctx.app.emit('error', error, ctx);
    }
  });
  return function (_x5) {
    return _ref4.apply(this, arguments);
  };
}();