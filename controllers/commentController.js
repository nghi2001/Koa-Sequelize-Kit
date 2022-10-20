exports.findAllComment = async (ctx, next) => {
    try {
        let taskid = ctx.params.taskid;
        let comments = await ctx.db.models.Comment.findAndCountAll({
            where: {
                TaskId: taskid
            }
        });

        ctx.body = comments;
    } catch (error) {
        ctx.app.emit('error', error, ctx);
    }
}

exports.createComment = async (ctx) => {

    try {
        let { content, TaskId } = ctx.request.body;
        let comment = await ctx.db.models.Comment.create({ content, TaskId });

        ctx.body = comment;

    } catch (error) {
        ctx.app.emit('error', error, ctx);
    }
}
exports.delete = async (ctx) => {
    try {
        let id = ctx.params.id;
        let result = await ctx.db.models.Comment.destroy({
            where: {
                id: id
            }
        });

        return ctx.body = result;
    } catch (error) {
        ctx.app.emit('error', error, ctx);
    }
}

exports.update = async (ctx) => {
    try {
        let id = ctx.params.id;
        let { content } = ctx.request.body;
        let result = await ctx.db.models.Comment.update({content: content}, {
            where: {
                id: id
            }
        });
        return ctx.body = result;
    } catch (error) {
        ctx.app.emit('error', error, ctx);
    }
}