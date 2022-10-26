import loginMiddleware from '../middlewares/login.middleware';
import verifyTokenMiddleware from '../middlewares/verifyToken.middleware';
const validate = require('../validate/validate')
const Route = require('@koa/router');
const route = new Route({
    prefix: "/auth"
});
const AuthController = require('../controllers/authController');

route.get("/test", verifyTokenMiddleware, async (ctx) => {
    ctx.body = 'k'
})
route.post("/login", loginMiddleware, AuthController.login)
route.post("/refreshToken", AuthController.getNewToken)
module.exports = route;