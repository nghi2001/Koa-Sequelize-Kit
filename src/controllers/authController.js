import * as AuthService from '../services/auth.service'
import * as UserService from '../services/user.service'
import ThrowError from '../utils/Error'
import jwt from 'jsonwebtoken'
export const login = async (ctx) => {
    try {
        let { username, password } = ctx.request.body
        let [checkAuthen, user] = await AuthService.authenUser(username, password)
        if (checkAuthen) {
            console.log(user.id)
            let accessToken = await AuthService.generateAccessToken({ id: user.id, username: user.username })
            let refreshToken = await AuthService.generateRefreshToken({ id: user.id, username: user.username })
            let updateRefreshToken = await UserService.updateRefreshToken(user.id, refreshToken)
            // console.log(updateRefreshToken)
            ctx.status = 201
            ctx.body = { accessToken, refreshToken }
        }
    } catch (error) {
        ctx.app.emit("error", error, ctx)
    }
}

export const logout = async (ctx) => {
    try {
        let idUser = ctx.user.id
        let result = await AuthService.logout(idUser)
        ctx.body = result
    } catch (error) {
        ctx.app.emit("error", error, ctx)
    }
}
const verifyToken = (token, secret) => {
    try {
        let verify = jwt.verify(token, secret)
        return verify
    } catch (error) {
        ThrowError(403, "Forbiden")
    }
}
export const getNewToken = async (ctx) => {
    try {
        let refreshToken = ctx.request.body.refreshToken
        if (!refreshToken) ctx.throw(401)
        let resultVerifyToken = verifyToken(refreshToken, process.env.REFRESHTOKEN_SECRET)
        // console.log(resultVerifyToken)
        if (resultVerifyToken) {
            let userid = resultVerifyToken.id
            let newToken = await AuthService.getNewToken(userid, refreshToken)
            console.log(newToken)
            ctx.body = newToken
        }
    } catch (error) {
        ctx.app.emit("error", error, ctx)
    }
}