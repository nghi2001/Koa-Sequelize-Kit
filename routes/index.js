const Route = require('@koa/router');
const routes = new Route();
const fs = require('fs');

let fileNames = fs.readdirSync(__dirname)
                    .filter(file => !__filename.includes(file));
fileNames.forEach(file => {
    let childRoute = require(`./${file}`);
    routes.use(childRoute.routes(), childRoute.allowedMethods());

})

module.exports = routes