import * as TaskService from '../services/task.service';

export const findById = async (ctx, next) => {
    try {
        let id = ctx.params.id;
        let task = await TaskService.findOne(id)
        if (!task) {
            ctx.throw(404, 'id not found')
        }
        ctx.body = task
    } catch (error) {
        ctx.app.emit("error", error, ctx)
    }
}

export const findAll = async (ctx, next) => {
    try {
        let tasks = await TaskService.getAllTask()
        ctx.body = tasks
    } catch (error) {
        ctx.app.emit("error", error, ctx)
    }
}

export const create = async (ctx) => {
    let { name, body, UserId } = ctx.request.body;
    try {
        let newTask = await TaskService.createTask({ name, body, UserId })
        if (newTask) {
            ctx.status = 201
            return ctx.body = newTask
        }
        ctx.throw(500, "can't create Task")
    } catch (error) {
        ctx.app.emit('error', error, ctx)
    }
}

export const destroy = async (ctx) => {
    let id = ctx.params.id;
    try {
        let result = await TaskService.deleteTask(id)
        console.log(result);
        if (result == 0) {
            ctx.throw(404, 'id not found')
        }
        ctx.body = result
    } catch (error) {
        ctx.app.emit('error', error, ctx)
    }
}

export const update = async (ctx) => {
    try {
        let updateData = ctx.request.body;
        let taskId = ctx.params.id;
        let result = await TaskService.updateTask(updateData, taskId);
        if (result == 0) {
            ctx.throw(404, 'id not found')
        }
        ctx.body = result;

    } catch (error) {
        ctx.app.emit('error', error, ctx)
    }
}