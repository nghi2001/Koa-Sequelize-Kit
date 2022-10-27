import createTaskMiddleware from '../middlewares/createTask.middleware';
import updateTaskMiddleware from '../middlewares/updateTask.middleware';
import verifyToken from '../middlewares/verifyToken.middleware'
const Route = require('@koa/router');
const route = new Route({
    prefix: "/task"
});
const TaskController = require('../controllers/taskController')

route.get("/:id", TaskController.findById)

route.get("/", TaskController.findAll)
route.post('/', verifyToken, createTaskMiddleware, TaskController.create)

route.put('/:id', verifyToken, updateTaskMiddleware, TaskController.update)

route.del('/:id',verifyToken, TaskController.destroy)

module.exports = route