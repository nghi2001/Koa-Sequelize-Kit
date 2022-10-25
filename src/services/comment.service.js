const { models } = require('../models')
const CommentModel = models.Comment
const TaskService = require('./task.service');

exports.checkId = (id) => {
    if (!Number(id) || id < 0) {
        let error = new Error("id invalid");
        error.status = 400;
        throw error
    }
    return true
}
exports.checkTaskExist = async (taskId) => {
    let task = await TaskService.findOne(taskId);
    if (!task) {
        let error = new Error("task not found");
        error.status = 200;
        throw error
    }
    console.log(!task);
    return true
}
exports.getCommentsByTaskId = async (id) => {
    if (this.checkId(id)) {
        let comments = await CommentModel.findAndCountAll({
            where: {
                TaskId: id
            }
        });
        return comments
    }
}
exports.checkCreateComment = (comment) => {
    let checkProp = comment.content && comment.TaskId;
    if (!checkProp) {
        let error = new Error("content or Taskid is missing");
        error.status = 422;
        throw error
    }
    return true
}
exports.createComment = async (comment) => {
    if (this.checkCreateComment(comment)) {
        await this.checkTaskExist(comment.TaskId)
        let newComment = await CommentModel.create({ content: comment.content, TaskId: comment.TaskId });
        return newComment
    }
}

exports.deleteComment = async (id) => {
    if (this.checkId(id)) {
        let result = await CommentModel.destroy({
            where: {
                id: id
            }
        });
        return result
    }
}
exports.checkContentComment = (content) => {
    console.log('content');
    if (!content || content.length == 0) {
        let error = new Error("content is missing");
        error.status = 422;
        throw error
    }
    return true
}
exports.updateComment = async (id, content) => {
    if (this.checkContentComment(content) && this.checkId(id)) {
        let result = await CommentModel.update({ content: content }, {
            where: {
                id: id
            }
        });
        return result
    }
}