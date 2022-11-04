import Queue from 'bee-queue'
import * as MailService from '../services/mail.service'
const mailQueue = new Queue("send_mail")

mailQueue.process((job, done) => {
    MailService.sendMail(
        job.data.to,
        job.data.subject,
        job.data.html
    )
    .then(res => {
        console.log(res);
        done(null, res)
    })
    .catch(err => {
        console.log(err);
    })
})

mailQueue.on("error", (err) => {
    console.log(`Queue error: ${err}`);
})
mailQueue.on("succeeded", (job, result) => {
    console.log(`Job ${job.id} succeeded with result : ${result}`)
})