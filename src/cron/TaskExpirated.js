import cronJob from 'cron'
import * as TaskService from '../services/task.service'
import Queue from 'bee-queue'
import redisClient from '../utils/redis'

const sendMailQueue = new Queue("send_mail")
const CronJob = cronJob.CronJob

let job = new CronJob(
	'*/10 * * * * *',
	async function () {
		let taskExpirated = await TaskService.taskExpired()

		taskExpirated.forEach(async (task, ind) => {

			let checkIdTaskExist = await redisClient.get(`id_${task.id}`)
			if (checkIdTaskExist != 'true') {

				let mail = {
					to: task.User.email,
					subject: "Task Expirated",
					html: `<b>Task ${task.name} đã hết hạn</b>`
				}

				sendMailQueue.createJob(mail)
					.save()
					.then(() => {
						redisClient.set(`id_${task.id}`, 'true', {
							EX: 60
						})
					})
			}
		})
	},
	null,
	true,
	'Asia/Ho_Chi_Minh'
)