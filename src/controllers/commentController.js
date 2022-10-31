import * as CommentService from '../services/comment.service'

export const findAllComment = async (ctx, next) => {
    try {
        let taskid = ctx.params.taskid
        let comments = await CommentService.getCommentsByTaskId(taskid)
        ctx.body = comments

    } catch (error) {
        ctx.app.emit('error', error, ctx)
    }
}

export const createComment = async (ctx) => {
    let { content, TaskId, file_attach } = ctx.request.body
    try {
        console.log(ctx.user.id)
        let comment = await CommentService.createComment({ content, TaskId , UserId: ctx.user.id, file_attach})
        ctx.status = 201
        ctx.body = comment
    } catch (error) {
        ctx.app.emit('error', error, ctx)
    }
}
export const destroy = async (ctx) => {
    try {
        let id = ctx.params.id
        let result = await CommentService.deleteComment(id)
        if (result == 0) {
            ctx.throw(404, 'id not found')
        }
        return ctx.body = result
    } catch (error) {
        ctx.app.emit('error', error, ctx)
    }
}

export const update = async (ctx) => {
    try {
        let id = ctx.params.id
        let { content } = ctx.request.body
        let result = await CommentService.updateComment(id, content)
        if (result == 0) {
            ctx.throw(404, 'id not found')
        }
        return ctx.body = result

    } catch (error) {
        ctx.app.emit('error', error, ctx)
    }
}