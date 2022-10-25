"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _this = void 0;
var _require = require('../models'),
  models = _require.models;
var TaskModel = models.Task;
exports.checkId = function (id) {
  if (!Number(id) || id < 0) {
    var error = new Error("id invalid");
    error.status = 400;
    throw error;
  }
  return true;
};
exports.findOne = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(id) {
    var task;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _this.checkId(id);
            _context.next = 3;
            return TaskModel.findByPk(id);
          case 3:
            task = _context.sent;
            return _context.abrupt("return", task);
          case 5:
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
exports.getAllTask = /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
  var tasks;
  return _regenerator["default"].wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return TaskModel.findAndCountAll({
            include: 'comments'
          });
        case 2:
          tasks = _context2.sent;
          return _context2.abrupt("return", tasks);
        case 4:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
}));
exports.checkTaskCreate = function (Task) {
  if (!Task.name || !Task.body) {
    return false;
  }
  return true;
};
exports.createTask = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(Task) {
    var newTask, error;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!_this.checkTaskCreate(Task)) {
              _context3.next = 7;
              break;
            }
            _context3.next = 3;
            return TaskModel.create(Task);
          case 3:
            newTask = _context3.sent;
            return _context3.abrupt("return", newTask);
          case 7:
            error = new Error("name or body is missing");
            error.status = 422;
            throw error;
          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return function (_x2) {
    return _ref3.apply(this, arguments);
  };
}();
exports.deleteTask = /*#__PURE__*/function () {
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
            return TaskModel.destroy({
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
  return function (_x3) {
    return _ref4.apply(this, arguments);
  };
}();
exports.checkTaskEmpty = function (task) {
  if (Object.keys(task).length === 0) {
    var error = new Error("data update is null");
    error.status = 422;
    throw error;
  }
  return true;
};
exports.updateTask = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(Task, taskId) {
    var result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!(_this.checkTaskEmpty(Task) && _this.checkId(taskId))) {
              _context5.next = 5;
              break;
            }
            _context5.next = 3;
            return TaskModel.update(Task, {
              where: {
                id: taskId
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
  return function (_x4, _x5) {
    return _ref5.apply(this, arguments);
  };
}();