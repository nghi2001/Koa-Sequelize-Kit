"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
const Route = require('@koa/router');
const route = new Route({
  prefix: "/db"
});
route.get("/init", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)(function* (ctx, next) {
    yield ctx.db.sequelize.sync({});
    ctx.body = 'success';
  });
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
module.exports = route;