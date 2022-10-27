import * as UserService from '../services/user.service';
import XlsxPopulate from 'xlsx-populate';
import fs from 'fs';
import {v1} from 'uuid';
export const create = async (ctx) => {
    try {
        let { username, password } = ctx.request.body;
        console.log(username, password);
        let user = await UserService.createUser(username, password);
        ctx.status = 201;
        ctx.body = user
    } catch (error) {
        ctx.app.emit("error", error, ctx);
    }
}

export const findAll = async (ctx) => {
    try {
        let users = await UserService.findAll();
        ctx.body = users
    } catch (error) {
        ctx.app.emit("error", error, ctx);
    }
}

export const findOne = async (ctx) => {
    try {
        let id = ctx.request.params.id;
        let result = await UserService.findById(id);
        ctx.body = result;
    } catch (error) {
        ctx.app.emit('error', error, ctx);
    }
}

export const destroy = async (ctx) => {
    try {
        let id = ctx.request.params.id;
        let result = await UserService.deleteUser(id);
        return ctx.body = result;
    } catch (error) {
        ctx.app.emit("error", error, ctx);
    }
}

export const update = async (ctx) => {
    try {
        let { username, password, newpassword } = ctx.request.body;
        let result = await UserService.updatePassWord(username, password, newpassword);
        return ctx.body = result;
    } catch (error) {
        ctx.app.emit("error", error, ctx);
    }
}

export const exportExcel = async (ctx) => {
    let column = [
        'id','name', 'body', 'state', 'createAt', 'updateAt', 'UserId'
    ]
    await XlsxPopulate.fromBlankAsync()
        .then(async (workbook) => {
            column.forEach((col, index) =>{
                workbook.sheet("Sheet1").cell(1,index+1).value(col).style('bold', true);
                workbook.sheet("Sheet1").column(index+1).width(20);
            })
            let user = await UserService.getListTask(ctx.user.id);
            let rowInd = 2;
            user.tasks.forEach((task) => {
                let colInd = 1;
                let taskValues = Object.values(task.dataValues);
                taskValues.forEach((val) => {
                    workbook.sheet("Sheet1").cell(rowInd,colInd).value(val);
                    colInd++
                })
                rowInd++
            })
            return workbook.toFileAsync('temp.xlsx')
        })
    let stream = fs.createReadStream(`temp.xlsx`)
    ctx.response.set("content-type", "application/vnd.ms-excel")
    ctx.response.set('Content-Disposition', 'attachment; filename="'+v1()+'.xlsx"')
    ctx.body = stream
}