import env from '../config/config';
import AWS from 'aws-sdk';

const S3 = new AWS.S3({
    accessKeyId: env("AWS_ACCESS_KEY"),
    secretAccessKey: env("AWS_SECRET_KEY")
})
console.log(S3);
export const upload = async (file, fileExt) => {
    let param = {
        Bucket: env("BUCKET"),
        Key: `${Date.now()}${fileExt}`,
        Body: file
    }
    await S3.upload(param, (err, data) => {
        if (err) console.log(err);
        console.log(data);
    })
    return true
}