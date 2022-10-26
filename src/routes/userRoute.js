const Route = require('@koa/router');
const route = new Route({
    prefix: "/user"
});
const UserController = require('../controllers/userController');

// route.get("/:taskid", CommentController.findAllComment);

route.post("/", UserController.create);
// route.delete("/:id", CommentController.delete);
// route.put("/:id", CommentController.update);

module.exports = route;