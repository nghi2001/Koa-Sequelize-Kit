import { Op } from 'sequelize'
import db from '../models'
const TaskModel = db.models.Task
const UserModel = db.models.User
import ThrowError from '../utils/Error'
export const checkId = (id) => {
    if (!Number(id) || id < 0) {
        ThrowError(400, "id invalid")
    }
    return true
}
export const findOne = async (id) => {
    checkId(id)

    let task = await TaskModel.findByPk(id)

    return task
}

export const getAllTask = async () => {
    let tasks = await TaskModel.findAndCountAll({ include: 'comments' })
    return tasks
}

export const checkTaskCreate = (Task) => {
    if (!Task.name || !Task.body || !Task.UserId) {
        return false
    }
    return true
}

export const createTask = async (Task) => {
    if (checkTaskCreate(Task)) {
        let newTask = await TaskModel.create(Task)
        return newTask
    } else {
        ThrowError(422, "name or body is missing")
    }
}

export const deleteTask = async (id) => {
    if (checkId(id)) {
        let result = await TaskModel.destroy({
            where: {
                id: id
            }
        })
        return result
    }
}
export const checkTaskEmpty = (task) => {
    if (Object.keys(task).length === 0) {
        ThrowError(422, "data update is null")
    }
    return true
}
export const updateTask = async (Task, taskId) => {
    if (checkTaskEmpty(Task) && checkId(taskId)) {
        let result = await TaskModel.update(Task, {
            where: {
                id: taskId
            }
        })
        return result
    }
}

export const taskExpired = async () => {
    let now = Date.now()
    let taskexp = await TaskModel.findAll({
        where: {
            expiration_date: {
                [Op.lte]: now
            },
            state: {
                [Op.ne]: 'Done'
            }
        },
        include: [UserModel]
    })
    return taskexp
}