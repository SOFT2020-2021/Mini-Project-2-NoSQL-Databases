const app = require('express')()
const redisRoutes = require('./routers/redisRoutes')
const mongoRoutes = require('./routers/mongoRoutes')
const mongodb = require('./datasources/mongodb')
const redis = require('./datasources/redis')
const PORT = 3000

app.use('/mongo', mongoRoutes)
app.use('/redis', redisRoutes)

app.listen(PORT, () => {
    console.log(`server listening on  http://127.0.0.1:${PORT}`)
    mongodb.connect()
    redis.connect()   
})