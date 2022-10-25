"use strict";

var Route = require('@koa/router');
var routes = new Route();
var fs = require('fs');
var fileNames = fs.readdirSync(__dirname).filter(function (file) {
  return !__filename.includes(file);
});
fileNames.forEach(function (file) {
  var childRoute = require("./".concat(file));
  routes.use(childRoute.routes(), childRoute.allowedMethods());
});
module.exports = routes;