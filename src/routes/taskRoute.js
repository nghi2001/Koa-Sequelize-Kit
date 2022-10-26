const Route = require('@koa/router');
const route = new Route({
    prefix: "/task"
});
const TaskController = require('../controllers/taskController')

route.get("/:id", TaskController.findById)

route.get("/", TaskController.findAll)
route.post('/', TaskController.create)

route.put('/:id', TaskController.update)

route.del('/:id', TaskController.destroy)

module.exports = route