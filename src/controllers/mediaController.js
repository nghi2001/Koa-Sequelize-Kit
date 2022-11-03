import * as MediaService from '../services/media.service'
import env from '../config/config'
import fs from 'fs'


export const shows = async (ctx) => {
    try {
        let medias = await MediaService.findAll();
        return ctx.body = medias
    } catch (error) {
        ctx.app.emit("error", error, ctx)
    }
}
export const upload = async (ctx) => {
    try {
        let UserId = ctx.request.body.UserId || null
        let CommentId = ctx.request.body.CommentId || null
        let media = await MediaService.create(ctx.request.file, CommentId, UserId)
        ctx.status = 201;
        ctx.body = media
    } catch (error) {
        ctx.app.emit("error", error, ctx)
    }
}

export const destroy = async (ctx) => {
    let id = ctx.params.id
    try {
        let media = await MediaService.find(id)
        fs.unlink(`${env("PATH_STORE_FILE")}/${media.filename}`, (err) => {
            if (err) ctx.throw(400, "can not delete file")
        })
        let result = await MediaService.detroy(id)
        ctx.body = result
    } catch (error) {
        ctx.app.emit("error", error, ctx)
    }
}

export const uploadMany = async (ctx) => {
    let UserId = ctx.request.body.UserId || null
    let CommentId = ctx.request.body.CommentId || null
    try {
        let result = await MediaService.createMany(ctx.request.files, CommentId, UserId)
        ctx.status = 201
        return ctx.body = result
    } catch (error) {
        ctx.app.emit("error", error, ctx)
    }
}