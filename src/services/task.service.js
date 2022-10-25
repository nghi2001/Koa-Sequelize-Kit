const { models } = require('../models')
const TaskModel = models.Task

exports.checkId = (id) => {
    if (!Number(id) || id < 0) {
        let error = new Error("id invalid");
        error.status = 400;
        throw error
    }
    return true
}
exports.findOne = async (id) => {
    this.checkId(id);

    let task = await TaskModel.findByPk(id);

    return task
}

exports.getAllTask = async () => {
    let tasks = await TaskModel.findAndCountAll({ include: 'comments' });
    return tasks
}

exports.checkTaskCreate = (Task) => {
    if (!Task.name || !Task.body) {
        return false
    }
    return true
}

exports.createTask = async (Task) => {
    if (this.checkTaskCreate(Task)) {
        let newTask = await TaskModel.create(Task)
        return newTask
    } else {
        let error = new Error("name or body is missing");
        error.status = 422;
        throw error
    }
}

exports.deleteTask = async (id) => {
    if (this.checkId(id)) {
        let result = await TaskModel.destroy({
            where: {
                id: id
            }
        })
        return result
    }
}
exports.checkTaskEmpty = (task) => {
    if (Object.keys(task).length === 0) {
        let error = new Error("data update is null");
        error.status = 422;
        throw error;
    }
    return true;
}
exports.updateTask = async (Task, taskId) => {
    if (this.checkTaskEmpty(Task) && this.checkId(taskId)) {
        let result = await TaskModel.update(Task, {
            where: {
                id: taskId
            }
        })
        return result
    }
}