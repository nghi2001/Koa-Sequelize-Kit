import * as UserService from '../services/user.service';


export const create = async (ctx) => {
    let {username, password} = ctx.request.body;
    try {
        let user = await UserService.createUser(username, password)
        ctx.status = 201;
        ctx.body = user
    } catch (error) {
        // console.log(error);
        ctx.app.emit("error", error, ctx)
    }
}