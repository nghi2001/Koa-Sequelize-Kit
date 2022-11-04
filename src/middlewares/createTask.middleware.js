import validate from "../validate/validate"
export default async (ctx, next) => {
    try {
        let rule = {
            name: 'string',
            body: 'string',
            expiration_date: {
                type: 'dateTime',
                required: false
            }
        }
        validate(ctx.request.body, rule)
        await next()
    } catch (error) {
        ctx.app.emit("error", error, ctx)
    }
}