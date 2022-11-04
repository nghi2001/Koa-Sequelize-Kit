import Queue from 'bee-queue'
import { checkUserIsActive } from '../services/user.service'
export const verifyUserAccount = new Queue('verify', {
    activateDelayedJobs: true
})


verifyUserAccount.process((job, done) => {
    console.log(job.data.username);
    checkUserIsActive(job.data.username)
        .then(data => {
            console.log(data);
            done()
        })
        .catch(err => {
            console.log(err);
        })
    
})