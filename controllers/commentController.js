let CommentService = require('../services/comment.service')
exports.findAllComment = async (ctx, next) => {
    try {
        let taskid = ctx.params.taskid;
        let comments = await CommentService.getCommentsByTaskId(taskid);
        ctx.body = comments;

    } catch (error) {
        ctx.app.emit('error', error, ctx);
    }
}

exports.createComment = async (ctx) => {
    let { content, TaskId } = ctx.request.body;
    try {
        let comment = await CommentService.createComment({content,TaskId})
        ctx.status = 201
        ctx.body = comment
    } catch (error) {
        ctx.app.emit('error', error, ctx);
    }
}
exports.delete = async (ctx) => {
    try {
        let id = ctx.params.id;
        let result = await CommentService.deleteComment(id)
        if(result == 0) {
            ctx.throw(404,'id not found')
        }
        return ctx.body = result;
    } catch (error) {
        ctx.app.emit('error', error, ctx);
    }
}

exports.update = async (ctx) => {
    try {
        let id = ctx.params.id;
        let { content } = ctx.request.body;
        let result = await CommentService.updateComment(id, content)
        if(result == 0) {
            ctx.throw(404,'id not found')
        }
        return ctx.body = result;

    } catch (error) {
        ctx.app.emit('error', error, ctx);
    }
}