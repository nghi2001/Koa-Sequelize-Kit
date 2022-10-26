import db from '../models';
import * as TaskService from './task.service';
const CommentModel = db.models.Comment

export const checkId = (id) => {
    if (!Number(id) || id < 0) {
        let error = new Error("id invalid");
        error.status = 400;
        throw error
    }
    return true
}
export const checkTaskExist = async (taskId) => {
    let task = await TaskService.findOne(taskId);
    if (!task) {
        let error = new Error("task not found");
        error.status = 200;
        throw error
    }
    console.log(!task);
    return true
}
export const getCommentsByTaskId = async (id) => {
    if (this.checkId(id)) {
        let comments = await CommentModel.findAndCountAll({
            where: {
                TaskId: id
            }
        });
        return comments
    }
}
export const checkCreateComment = (comment) => {
    let checkProp = comment.content && comment.TaskId;
    if (!checkProp) {
        let error = new Error("content or Taskid is missing");
        error.status = 422;
        throw error
    }
    return true
}
export const createComment = async (comment) => {
    if (this.checkCreateComment(comment)) {
        await this.checkTaskExist(comment.TaskId)
        let newComment = await CommentModel.create({ content: comment.content, TaskId: comment.TaskId });
        return newComment
    }
}

export const deleteComment = async (id) => {
    if (this.checkId(id)) {
        let result = await CommentModel.destroy({
            where: {
                id: id
            }
        });
        return result
    }
}
export const checkContentComment = (content) => {
    console.log('content');
    if (!content || content.length == 0) {
        let error = new Error("content is missing");
        error.status = 422;
        throw error
    }
    return true
}
export const updateComment = async (id, content) => {
    if (this.checkContentComment(content) && this.checkId(id)) {
        let result = await CommentModel.update({ content: content }, {
            where: {
                id: id
            }
        });
        return result
    }
}