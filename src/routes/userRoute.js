const Route = require('@koa/router');
const route = new Route({
    prefix: "/user"
});
const UserController = require('../controllers/userController');

route.get("/:id", UserController.findOne);
route.get("/", UserController.findAll)
route.post("/", UserController.create);
route.delete("/:id", UserController.destroy);
route.put("/", UserController.update);

module.exports = route;