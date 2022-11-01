import Route from '@koa/router'
const route = new Route({
    prefix: "/db"
});

route.get("/init", async (ctx, next) => {
    await ctx.db.sequelize.sync({})
    ctx.body = 'success'
})

module.exports = route