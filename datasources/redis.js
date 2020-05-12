const REDIS_PORT = process.env.REDISPORT || 6379
const redis = require('redis')
let redisClient

module.exports = {
    connect: () => {
        try {
            redisClient = redis.createClient(REDIS_PORT)
            console.log(`connected to redis on port: "${process.env.REDISPORT || 6379}"`)
        } catch (e) {
            console.warn("redis connection is not established", e)
        }
    },
    insertAll: (data) => {
        return new Promise((resolve, reject) => {
            let counter = 0
            data.forEach(movie => {
                redisClient.hmset(pokemon.title, movie, function (err, _) {
                    if (err) reject(err)
                    counter++
                })
            })
            resolve({ insertedDocuments: counter })
        })
    },
    getAll: () => {
        return new Promise((resolve, reject) => {
            return redisClient.hgetall(id, (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
        })
    },
    updateAll: () => {

    },
    deleteAll: () => {

    },
    close: () => {

    }
}
