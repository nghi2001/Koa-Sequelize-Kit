import Route from '@koa/router'
import createCommentMiddleware from '../middlewares/createComment.middleware'
import verifyTokenMiddleware from '../middlewares/verifyToken.middleware'
import * as CommentController from '../controllers/commentController'

const route = new Route({
    prefix: "/comment"
})

route.get("/:taskid", CommentController.findAllComment)

route.post("/", verifyTokenMiddleware, createCommentMiddleware, CommentController.createComment)
route.delete("/:id", verifyTokenMiddleware, CommentController.destroy)
route.put("/:id", verifyTokenMiddleware, CommentController.update)

module.exports = route