const Route = require('@koa/router');
const route = new Route({
    prefix: "/comment"
});
const CommentController = require('../controllers/commentController');

route.get("/:taskid", CommentController.findAllComment);

route.post("/", CommentController.createComment);
route.delete("/:id", CommentController.destroy);
route.put("/:id", CommentController.update);

module.exports = route;