import db from '../models'
const TaskModel = db.models.Task

export const checkId = (id) => {
    if (!Number(id) || id < 0) {
        let error = new Error("id invalid");
        error.status = 400;
        throw error
    }
    return true
}
export const findOne = async (id) => {
    checkId(id);

    let task = await TaskModel.findByPk(id);

    return task
}

export const getAllTask = async () => {
    let tasks = await TaskModel.findAndCountAll({ include: 'comments' });
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
        let error = new Error("name or body is missing");
        error.status = 422;
        throw error
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
        let error = new Error("data update is null");
        error.status = 422;
        throw error;
    }
    return true;
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