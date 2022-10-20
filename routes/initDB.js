const Route = require('@koa/router');
const route = new Route({
    prefix: "/db"
});

route.get("/init", (ctx, next) => {
    ctx.db.sequelize.sync({})
        .then(() => {
            ctx.body = 'success'
        })
        .catch((err) => {
            ctx.body = err
        })
})

module.exports = route