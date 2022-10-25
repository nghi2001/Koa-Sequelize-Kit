"use strict";

var Route = require('@koa/router');
var route = new Route({
  prefix: "/comment"
});
var CommentController = require('../controllers/commentController');
route.get("/:taskid", CommentController.findAllComment);
route.post("/", CommentController.createComment);
route["delete"]("/:id", CommentController["delete"]);
route.put("/:id", CommentController.update);
module.exports = route;