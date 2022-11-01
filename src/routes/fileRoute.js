import multer from '@koa/multer'
import path from 'path'
import fs from 'fs'
import verifyTokenMiddleware from '../middlewares/verifyToken.middleware'
const Route = require('@koa/router')
const route = new Route({
    prefix: "/file"
})

let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/uploads')
    },
    filename: (req, file, callback) => {
        let fileName = Date.now()+path.extname(file.originalname)
        file.filename = fileName
        callback(null, fileName)
    }
})

route.post("/", (ctx) => {
    try {
        let {fileName} = ctx.request.body;
        fs.unlink("./public/uploads/"+fileName, (err) => {
            console.log(err);
        })
        ctx.body = 'success'
    } catch (error) {
        ctx.app.emit("error", error, ctx)
    }
})

route.post("/single",
    multer({
        storage: storage
    }).single("file")
    ,(ctx) => {
        ctx.status = 201;
        ctx.body = ctx.request.file
    })

route.post("/multi",
    multer({
        storage: storage
    }).array("files"),
    (ctx) => {
        console.log(ctx.request.files)
        ctx.status = 201
        ctx.body = ctx.request.files
    }
)

module.exports = route