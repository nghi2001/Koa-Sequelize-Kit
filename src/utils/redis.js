const redis = require('redis')
console.log(redis);
const redisClient = redis.createClient({
    url: 'redis://localhost:6379'
})
const connect = async () => {
    return await redisClient.connect()
}

connect()
export default redisClient