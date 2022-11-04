import createTaskMiddleware from '../middlewares/createTask.middleware'
import updateTaskMiddleware from '../middlewares/updateTask.middleware'
import verifyToken from '../middlewares/verifyToken.middleware'
import Route from '@koa/router'
import * as TaskController from '../controllers/taskController'

const route = new Route({
    prefix: "/task"
})

route.get("/expiration", TaskController.taskExpired)
route.get("/:id", TaskController.findById)
route.get("/", TaskController.findAll)
route.post('/', verifyToken, createTaskMiddleware, TaskController.create)

route.put('/:id', verifyToken, updateTaskMiddleware, TaskController.update)

route.del('/:id',verifyToken, TaskController.destroy)

module.exports = route