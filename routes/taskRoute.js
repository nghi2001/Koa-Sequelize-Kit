const Route = require('@koa/router');
const route = new Route({
    prefix: "/task"
});


route.get("/:id", async (ctx, next) => {
    try {
        let id = ctx.params.id;
        if(!Number(id)){
            throw Error('id khong hop le')
        }
        let tasks = await ctx.db.models.Task.findByPk(id);
        console.log(tasks);
        if(tasks) {
            ctx.body = tasks
        } else {
            ctx.body = []
        }
    } catch (error) {
        ctx.app.emit('error', error, ctx)
    }
})

route.get("/", async (ctx, next) => {
    let tasks = await ctx.db.models.Task.findAndCountAll({include: 'comments'});

    ctx.body = tasks
})
route.post('/', async (ctx) => {
    try {
        let {name, body} = ctx.request.body;
        // console.log(name);
        let newTask = await ctx.db.models.Task.create({name: name, body: body})

        ctx.body = newTask

    } catch (error) {
        ctx.app.emit('error', error, ctx)
    }
})
// route.post('/time', async (ctx) => {
//     try {
//         var date = new Date();
//         var dateStr =
//         ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
//         ("00" + date.getDate()).slice(-2) + "/" +
//         date.getFullYear() + " " +
//         ("00" + date.getHours()).slice(-2) + ":" +
//         ("00" + date.getMinutes()).slice(-2) + ":" +
//         ("00" + date.getSeconds()).slice(-2);
//         console.log(dateStr)
//         ctx.body = dateStr

//     } catch (error) {
//         ctx.app.emit('error', error, ctx)
//     }
// })

route.put('/:id', async (ctx) => {
    try {
        let updateData = ctx.request.body
        if(!ctx.request.body.name) {
            updateData = {state: updateData.state, body: updateData.body}
        }
        if(!ctx.request.body.body) {
            updateData = {state: updateData.state, name: updateData.name}
        }
        let result = await ctx.db.models.Task.update(updateData, {
            where: {
                id: ctx.params.id
            }
        })
        ctx.body = result
        
    } catch (error) {
        ctx.app.emit('error', error, ctx) 
    }
})

route.del('/:id', async (ctx) => {
    try {
        let id = ctx.params.id;
        if(!Number(id)){
            throw Error('id khong hop le')
        }
        let result = await ctx.db.models.Task.destroy({
            where: {
                id: id
            }
        })
        ctx.body = result
    } catch (error) {
        ctx.app.emit('error', error, ctx) 
    }
})

module.exports = route