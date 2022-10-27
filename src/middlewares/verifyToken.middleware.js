import jwt, { verify } from 'jsonwebtoken'

const verifyToken = (token, secret) => {
    try {
        let verify = jwt.verify(token, secret)
        return verify
    } catch (error) {
        let err = new Error("Forbiden")
        err.status = 403
        throw err
    }
}
export default async (ctx, next) => {
    try {
        let Authorization = ctx.get('Authorization')
        let token = Authorization.replace(/Bearer/g, '').trim()
        if (!Authorization || !token) ctx.throw(401, 'Unauthorized')
        let verifyResult = verifyToken(token, process.env.ACCESSTOKEN_SECRET)
        if (verifyResult) {
            ctx.user = verifyResult
            await next()
        }

    } catch (error) {
        ctx.app.emit('error', error, ctx)
    }
}