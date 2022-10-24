const Route = require('@koa/router');
const route = new Route({
    prefix: "/task"
});
const TaskController = require('../controllers/taskController')
// route.get("/test", (ctx) => {
//     try {
//         ctx.throw(401,'not fount')
//     } catch (error) {
//         // console.log(error.status);
//         ctx.app.emit('error',error,  ctx)
//     }
// })
route.get("/:id", TaskController.findById)

route.get("/", TaskController.findAll)
route.post('/', TaskController.create)

route.put('/:id', TaskController.update)

route.del('/:id', TaskController.delete)

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
module.exports = route