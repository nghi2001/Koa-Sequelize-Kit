import db from '../models'
import * as TaskService from './task.service'
import ThrowError from '../utils/Error'
const CommentModel = db.models.Comment

export const checkId = (id) => {
    if (!Number(id) || id < 0) {
        ThrowError(400, "id invalid")
    }
    return true
}
export const checkTaskExist = async (taskId) => {
    let task = await TaskService.findOne(taskId)
    if (!task) {
        ThrowError(404, "Task not found")
    }
    console.log(!task)
    return true
}
export const getCommentsByTaskId = async (id) => {
    if (checkId(id)) {
        let comments = await CommentModel.findAndCountAll({
            where: {
                TaskId: id
            }
        })
        return comments
    }
}
export const checkCreateComment = (comment) => {
    let checkProp = comment.content && comment.TaskId
    if (!checkProp) {
        ThrowError(422, "content or Taskid is missing")
    }
    return true
}
export const createComment = async (comment) => {
    if (checkCreateComment(comment)) {
        await checkTaskExist(comment.TaskId)
        let newComment = await CommentModel.create({ 
            content: comment.content, TaskId: comment.TaskId ,
            UserId: comment.UserId,
            file_attach: comment.file_attach})
        return newComment
    }
}

export const deleteComment = async (id) => {
    if (checkId(id)) {
        let result = await CommentModel.destroy({
            where: {
                id: id
            }
        })
        return result
    }
}
export const checkContentComment = (content) => {
    console.log('content')
    if (!content || content.length == 0) {
        ThrowError(422, "content is missing")
    }
    return true
}
export const updateComment = async (id, content) => {
    if (checkContentComment(content) && checkId(id)) {
        let result = await CommentModel.update({ content: content }, {
            where: {
                id: id
            }
        })
        return result
    }
}