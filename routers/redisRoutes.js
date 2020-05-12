const router = require('express').Router()
const redisClient = require('../datasources/redis')
const dataImporter = require('../util/dataImporter')
const timelog = require('../util/timelog')

router.post('/insert-all-movies', async (req, res) => {
    const data = dataImporter.getData()
    res.send("not implemented yet")
})

router.put('/update-all-casts',  (req, res) => {
    res.send("not implemented yet")
})

router.put('/get-all-movie-names', (req, res) => {
    res.send("not implemented yet")
})

router.get('/delete-all-movies', function (req, res) {
    res.send("not implemented yet")
})


module.exports = router