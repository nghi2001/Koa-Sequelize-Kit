// import {addQueue} from '../Jobs/addQueue'
import Queue from 'bee-queue'
const queue = new Queue('addition')
export const create = (ctx) => {
    queue.createJob({x:8,y:3})
        .delayUntil(Date.now() + 3000)
        .save()
}