"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _this = void 0;
const {
  models
} = require('../models');
const TaskModel = models.Task;
exports.checkId = id => {
  if (!Number(id) || id < 0) {
    let error = new Error("id invalid");
    error.status = 400;
    throw error;
  }
  return true;
};
exports.findOne = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)(function* (id) {
    _this.checkId(id);
    let task = yield TaskModel.findByPk(id);
    return task;
  });
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();
exports.getAllTask = /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
  let tasks = yield TaskModel.findAndCountAll({
    include: 'comments'
  });
  return tasks;
});
exports.checkTaskCreate = Task => {
  if (!Task.name || !Task.body) {
    return false;
  }
  return true;
};
exports.createTask = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)(function* (Task) {
    if (_this.checkTaskCreate(Task)) {
      let newTask = yield TaskModel.create(Task);
      return newTask;
    } else {
      let error = new Error("name or body is missing");
      error.status = 422;
      throw error;
    }
  });
  return function (_x2) {
    return _ref3.apply(this, arguments);
  };
}();
exports.deleteTask = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)(function* (id) {
    if (_this.checkId(id)) {
      let result = yield TaskModel.destroy({
        where: {
          id: id
        }
      });
      return result;
    }
  });
  return function (_x3) {
    return _ref4.apply(this, arguments);
  };
}();
exports.checkTaskEmpty = task => {
  if (Object.keys(task).length === 0) {
    let error = new Error("data update is null");
    error.status = 422;
    throw error;
  }
  return true;
};
exports.updateTask = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2.default)(function* (Task, taskId) {
    if (_this.checkTaskEmpty(Task) && _this.checkId(taskId)) {
      let result = yield TaskModel.update(Task, {
        where: {
          id: taskId
        }
      });
      return result;
    }
  });
  return function (_x4, _x5) {
    return _ref5.apply(this, arguments);
  };
}();