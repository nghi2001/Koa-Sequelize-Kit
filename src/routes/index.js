import Route from '@koa/router'
import fs from 'fs'
const routes = new Route()

let fileNames = fs.readdirSync(__dirname)
    .filter(file => !__filename.includes(file))

fileNames.forEach(file => {
    let childRoute = require(`./${file}`)
    routes.use(childRoute.routes(), childRoute.allowedMethods())

})

module.exports = routes