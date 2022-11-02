import * as UserService from '../services/user.service'
import XlsxPopulate from 'xlsx-populate'
import fs from 'fs'
import { v1 } from 'uuid'

export const create = async (ctx) => {
    let { username, password } = ctx.request.body
    try {
        let user = await UserService.createUser(username, password)
        ctx.status = 201
        ctx.body = user

    } catch (error) {
        // fs.unlink("./public/avatar/" + avatar, (err) => {
        //     console.log(err)
        // })
        ctx.app.emit("error", error, ctx)
    }
}

export const findAll = async (ctx) => {
    try {
        let users = await UserService.findAll()
        ctx.body = users
    } catch (error) {
        ctx.app.emit("error", error, ctx)
    }
}

export const findOne = async (ctx) => {
    try {
        let id = ctx.request.params.id
        let result = await UserService.findById(id)
        ctx.body = result
    } catch (error) {
        ctx.app.emit('error', error, ctx)
    }
}

export const destroy = async (ctx) => {
    try {
        let id = ctx.request.params.id
        let result = await UserService.deleteUser(id)
        return ctx.body = result
    } catch (error) {
        ctx.app.emit("error", error, ctx)
    }
}

export const update = async (ctx) => {
    try {
        let { username, password, newpassword } = ctx.request.body
        let result = await UserService.updatePassWord(username, password, newpassword)
        return ctx.body = result
    } catch (error) {
        ctx.app.emit("error", error, ctx)
    }
}

export const exportExcel = async (ctx) => {
    let column = [
        'id', 'name', 'body', 'state', 'createAt', 'updateAt', 'UserId'
    ]
    let workbook = await XlsxPopulate.fromBlankAsync()
        .then(async (workbook) => {
            column.forEach((col, index) => {
                workbook.sheet("Sheet1").cell(1, index + 1).value(col).style('bold', true)
                workbook.sheet("Sheet1").column(index + 1).width(20)
            })
            let user = await UserService.getListTask(3)
            let rowInd = 2
            user.tasks.forEach((task) => {
                let colInd = 1
                let taskValues = Object.values(task.dataValues)
                taskValues.forEach((val) => {
                    workbook.sheet("Sheet1").cell(rowInd, colInd).value(val.toString())
                    colInd++
                })
                rowInd++
            })
            return await workbook.outputAsync()
        })
    let filename = `${v1()}.xlsx`;
    ctx.response.set("content-type", "application/vnd.ms-excel")
    ctx.response.set('Content-Disposition', 'attachment; filename='+filename)
    ctx.body = workbook
}

export const updateAvatar = async (ctx) => {
    let { avatar } = ctx.request.body
    let idUser = ctx.params.id
    try {
        let user = await UserService.findById(idUser)
        let result = await UserService.updateAvatar(idUser, avatar)
        if (result == 1 && user.avatar !== avatar) {
            UserService.deleteAvatar(user.avatar)
        }
        return ctx.body = result
    } catch (error) {
        ctx.app.emit("error", error, ctx)
    }
}