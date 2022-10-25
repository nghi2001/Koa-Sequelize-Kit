"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
const TaskService = require('../services/task.service');
exports.findById = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)(function* (ctx, next) {
    try {
      let id = ctx.params.id;
      let task = yield TaskService.findOne(id);
      if (!task) {
        ctx.throw(404, 'id not found');
      }
      ctx.body = task;
    } catch (error) {
      ctx.app.emit("error", error, ctx);
    }
  });
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.findAll = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)(function* (ctx, next) {
    try {
      let tasks = yield TaskService.getAllTask();
      ctx.body = tasks;
    } catch (error) {
      ctx.app.emit("error", error, ctx);
    }
  });
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.create = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)(function* (ctx) {
    let {
      name,
      body
    } = ctx.request.body;
    try {
      let newTask = yield TaskService.createTask({
        name,
        body
      });
      if (newTask) {
        ctx.status = 201;
        return ctx.body = newTask;
      }
      ctx.throw(500, "can't create Task");
    } catch (error) {
      ctx.app.emit('error', error, ctx);
    }
  });
  return function (_x5) {
    return _ref3.apply(this, arguments);
  };
}();
exports.delete = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)(function* (ctx) {
    let id = ctx.params.id;
    try {
      let result = yield TaskService.deleteTask(id);
      console.log(result);
      if (result == 0) {
        ctx.throw(404, 'id not found');
      }
      ctx.body = result;
    } catch (error) {
      ctx.app.emit('error', error, ctx);
    }
  });
  return function (_x6) {
    return _ref4.apply(this, arguments);
  };
}();
exports.update = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2.default)(function* (ctx) {
    try {
      let updateData = ctx.request.body;
      let taskId = ctx.params.id;
      let result = yield TaskService.updateTask(updateData, taskId);
      if (result == 0) {
        ctx.throw(404, 'id not found');
      }
      ctx.body = result;
    } catch (error) {
      ctx.app.emit('error', error, ctx);
    }
  });
  return function (_x7) {
    return _ref5.apply(this, arguments);
  };
}();