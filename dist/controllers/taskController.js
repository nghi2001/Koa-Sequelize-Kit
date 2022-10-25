"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var TaskService = require('../services/task.service');
exports.findById = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx, next) {
    var id, task;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            id = ctx.params.id;
            _context.next = 4;
            return TaskService.findOne(id);
          case 4:
            task = _context.sent;
            if (!task) {
              ctx["throw"](404, 'id not found');
            }
            ctx.body = task;
            _context.next = 12;
            break;
          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            ctx.app.emit("error", _context.t0, ctx);
          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.findAll = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(ctx, next) {
    var tasks;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return TaskService.getAllTask();
          case 3:
            tasks = _context2.sent;
            ctx.body = tasks;
            _context2.next = 10;
            break;
          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            ctx.app.emit("error", _context2.t0, ctx);
          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.create = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(ctx) {
    var _ctx$request$body, name, body, newTask;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _ctx$request$body = ctx.request.body, name = _ctx$request$body.name, body = _ctx$request$body.body;
            _context3.prev = 1;
            _context3.next = 4;
            return TaskService.createTask({
              name: name,
              body: body
            });
          case 4:
            newTask = _context3.sent;
            if (!newTask) {
              _context3.next = 8;
              break;
            }
            ctx.status = 201;
            return _context3.abrupt("return", ctx.body = newTask);
          case 8:
            ctx["throw"](500, "can't create Task");
            _context3.next = 14;
            break;
          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](1);
            ctx.app.emit('error', _context3.t0, ctx);
          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 11]]);
  }));
  return function (_x5) {
    return _ref3.apply(this, arguments);
  };
}();
exports["delete"] = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(ctx) {
    var id, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = ctx.params.id;
            _context4.prev = 1;
            _context4.next = 4;
            return TaskService.deleteTask(id);
          case 4:
            result = _context4.sent;
            console.log(result);
            if (result == 0) {
              ctx["throw"](404, 'id not found');
            }
            ctx.body = result;
            _context4.next = 13;
            break;
          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](1);
            ctx.app.emit('error', _context4.t0, ctx);
          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 10]]);
  }));
  return function (_x6) {
    return _ref4.apply(this, arguments);
  };
}();
exports.update = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(ctx) {
    var updateData, taskId, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            updateData = ctx.request.body;
            taskId = ctx.params.id;
            _context5.next = 5;
            return TaskService.updateTask(updateData, taskId);
          case 5:
            result = _context5.sent;
            if (result == 0) {
              ctx["throw"](404, 'id not found');
            }
            ctx.body = result;
            _context5.next = 13;
            break;
          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);
            ctx.app.emit('error', _context5.t0, ctx);
          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 10]]);
  }));
  return function (_x7) {
    return _ref5.apply(this, arguments);
  };
}();