import createTaskMiddleware from '../middlewares/createTask.middleware';
import updateTaskMiddleware from '../middlewares/updateTask.middleware';
const Route = require('@koa/router');
const route = new Route({
    prefix: "/task"
});
const TaskController = require('../controllers/taskController')

route.get("/:id", TaskController.findById)

route.get("/", TaskController.findAll)
route.post('/',createTaskMiddleware, TaskController.create)

route.put('/:id',updateTaskMiddleware ,TaskController.update)

route.del('/:id', TaskController.destroy)

module.exports = route