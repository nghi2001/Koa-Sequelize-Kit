const Route = require('@koa/router');
const route = new Route({
    prefix: "/comment"
});
import createCommentMiddleware from '../middlewares/createComment.middleware';
const CommentController = require('../controllers/commentController');

route.get("/:taskid", CommentController.findAllComment);

route.post("/",createCommentMiddleware , CommentController.createComment);
route.delete("/:id", CommentController.destroy);
route.put("/:id", CommentController.update);

module.exports = route;