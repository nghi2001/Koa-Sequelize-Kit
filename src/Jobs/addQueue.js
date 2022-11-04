import Queue from 'bee-queue'

export const addQueue = new Queue('addition',{
    activateDelayedJobs: true
})


addQueue.process((job, done) => {
    // console.log(`Processing job ${job.id}`);
    // return done(null,job.data.x+job.data.y)
    
        console.log(job.id);
        done()
})