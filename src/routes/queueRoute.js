import * as QueueController from '../controllers/queueController'
import Route from '@koa/router'
const routes = new Route({
    prefix: "/queue"
})

routes.get("/create", QueueController.create)


module.exports = routes