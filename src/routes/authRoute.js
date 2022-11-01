import loginMiddleware from '../middlewares/login.middleware'
import verifyTokenMiddleware from '../middlewares/verifyToken.middleware'
import Route from '@koa/router'
import * as AuthController from '../controllers/authController'
const route = new Route({
    prefix: "/auth"
})

route.post("/login", loginMiddleware, AuthController.login)
route.post("/logout",verifyTokenMiddleware, AuthController.logout)
route.post("/refreshToken", AuthController.getNewToken)
module.exports = route