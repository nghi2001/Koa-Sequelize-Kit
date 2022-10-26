import * as AuthService from '../services/auth.service';

export const login = async (ctx) => {
    try {
        let {username, password} = ctx.request.body;
        let [checkAuthen, user] = await AuthService.authenUser(username, password);
        if( checkAuthen ) {
            // let {password, ...payload} = user;
            console.log(user.id);
            let accessToken = await AuthService.generateAccessToken({id:user.id, username:user.username});
            let refreshToken = await AuthService.generateRefreshToken({id:user.id, username:user.username});
            ctx.status = 201;
            ctx.body = {accessToken, refreshToken}
        }
    } catch (error) {
        ctx.app.emit("error", error, ctx);
    }
}