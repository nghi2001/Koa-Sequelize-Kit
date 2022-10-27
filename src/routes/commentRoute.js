const Route = require('@koa/router')
const route = new Route({
    prefix: "/comment"
})
import createCommentMiddleware from '../middlewares/createComment.middleware'
import verifyTokenMiddleware from '../middlewares/verifyToken.middleware'
const CommentController = require('../controllers/commentController')

route.get("/:taskid", CommentController.findAllComment)

route.post("/",verifyTokenMiddleware,createCommentMiddleware , CommentController.createComment)
route.delete("/:id",verifyTokenMiddleware, CommentController.destroy)
route.put("/:id", verifyTokenMiddleware,CommentController.update)

module.exports = route