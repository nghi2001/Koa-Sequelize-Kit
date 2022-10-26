import validate from "../validate/validate"
export default async (ctx, next) => {
    try {
        let rule = {
            username: "string",
            password: "string"
        }
        validate(ctx.request.body, rule)
        await next()
    } catch (error) {
        ctx.app.emit("error", error, ctx)
    }
}