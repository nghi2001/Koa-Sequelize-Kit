import * as UserService from '../services/user.service';


export const create = async (ctx) => {
    try {
        let { username, password } = ctx.request.body;
        console.log(username, password);
        let user = await UserService.createUser(username, password);
        ctx.status = 201;
        ctx.body = user
    } catch (error) {
        ctx.app.emit("error", error, ctx);
    }
}

export const findAll = async (ctx) => {
    try {
        let users = await UserService.findAll();
        ctx.body = users
    } catch (error) {
        ctx.app.emit("error", error, ctx);
    }
}

export const findOne = async (ctx) => {
    try {
        let id = ctx.request.params.id;
        let result = await UserService.findById(id);
        ctx.body = result;
    } catch (error) {
        ctx.app.emit('error', error, ctx);
    }
}

export const destroy = async (ctx) => {
    try {
        let id = ctx.request.params.id;
        let result = await UserService.deleteUser(id);
        return ctx.body = result;
    } catch (error) {
        ctx.app.emit("error", error, ctx);
    }
}

export const update = async (ctx) => {
    try {
        let { username, password, newpassword } = ctx.request.body;
        let result = await UserService.updatePassWord(username, password, newpassword);
        return ctx.body = result;
    } catch (error) {
        ctx.app.emit("error", error, ctx);
    }
}

export const exportExcel = async (ctx) => {
    
}