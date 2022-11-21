import * as S3Service from '../services/S3.service';
import path from 'path';
import AWS from 'aws-sdk';
import Route from '@koa/router';
import koaBody from 'koa-body';
import fs from 'fs';
const S3 = new AWS.S3({
    accessKeyId: "AKIARWRYKBRLTFPDHUI2",
    secretAccessKey: "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"
})

const route = new Route({
    prefix: "/aws"
})

route.use(koaBody({
    multipart: true
}))
route.post("/", async (ctx, next) => {
    let file = fs.readFileSync(ctx.request.files.file.filepath);
    let fileExt = path.extname(ctx.request.files.file.originalFilename);
    await S3Service.upload(file, fileExt);
    ctx.body = 'upload success'
})
module.exports = route