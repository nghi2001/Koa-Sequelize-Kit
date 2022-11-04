import verifyTokenMiddleware from '../middlewares/verifyToken.middleware'
import Route from '@koa/router'
import * as UserController from '../controllers/userController'
import createUserMiddleware from '../middlewares/createUser.middleware'

const route = new Route({
    prefix: "/user"
})

route.get("/export/:userId", UserController.exportExcel)
route.get("/:id", UserController.findOne)
route.get("/", UserController.findAll)
route.post("/",createUserMiddleware, UserController.create)
route.delete("/:id", UserController.destroy)
route.put("/", UserController.update)
route.put("/avatar/:id", UserController.updateAvatar)
route.put("/active", verifyTokenMiddleware, UserController.activeUser)
module.exports = route