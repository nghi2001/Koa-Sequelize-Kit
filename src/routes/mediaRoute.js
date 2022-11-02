import multer from '@koa/multer'
import path from 'path'
import fs from 'fs'
import Route from '@koa/router'
import * as MediaController from '../controllers/mediaController'
import env from '../config/config'

const route = new Route({
    prefix: "/file"
})

let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, env("PATH_STORE_FILE"))
    },
    filename: (req, file, callback) => {
        let fileName = Date.now()+path.extname(file.originalname)
        file.filename = fileName
        callback(null, fileName)
    }
})

route.delete("/:id", MediaController.destroy)

route.post("/single",
    multer({
        storage: storage
    }).single("file")
    ,MediaController.upload)

route.post("/multi",
    multer({
        storage: storage
    }).array("files"),
    MediaController.uploadMany
)

module.exports = route