const Route = require('@koa/router');
const route = new Route({
    prefix: "/auth"
});
const AuthController = require('../controllers/authController');

route.post("/login", AuthController.login)

module.exports = route;