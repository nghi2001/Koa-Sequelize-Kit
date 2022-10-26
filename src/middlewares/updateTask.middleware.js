import validate from "../validate/validate"
export default async (ctx, next) => {
    try {
        let rule = {
            name: {
                type: 'string',
                required: false
            },
            body: {
                type: 'string',
                required: false
            },
            state: {
                type: 'string',
                required: false
            }
        }
        validate(ctx.request.body, rule)
        await next()
    } catch (error) {
        ctx.app.emit("error", error, ctx)
    }
}