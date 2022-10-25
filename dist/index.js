"use strict";

var KOA = require('koa');
var app = new KOA();
var dotenv = require('dotenv');
dotenv.config();
var cors = require('@koa/cors');
var koaBody = require('koa-body');
var routes = require('./routes');
var db = require('./models/index');
var PORT = process.env.PORT;
app.use(cors());
app.use(koaBody());
app.context.db = db;
app.on('error', function (err, ctx) {
  // console.error('server error', mess)
  ctx.status = err.status || 500;
  ctx.body = {
    code: err.status || 500,
    msg: err.message
  };
});
app.use(routes.routes(), routes.allowedMethods());
app.listen(PORT, function () {
  return console.log("http://localhost:".concat(PORT));
});