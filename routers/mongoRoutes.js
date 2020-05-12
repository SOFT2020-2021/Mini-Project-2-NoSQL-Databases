const router = require('express').Router()
const mongoClient = require('../datasources/mongodb')
const dataImporter = require('../util/dataImporter')
const timelog = require('../util/timelog')

router.post('/all', async (req, res) => {
    try {
        const data = dataImporter.getData()
        const body = JSON.stringify(await timelog.timer(() => mongoClient.insertAll(data)))
        res.status(200).send(body)
    } catch (e) {
        res.status(500).send({ msg: e })
    }
})

router.put('/all-casts/:name', async (req, res) => {
    try {
        const body = JSON.stringify(await timelog.timer(() => mongoClient.updateAll(req.params.name)))
        res.status(200).send(body)
    } catch (e) {
        res.status(500).send({ msg: e })
    }
})

router.get('/all/:arg', async (req, res) => {
    try {
        const body = JSON.stringify(await timelog.timer(() => mongoClient.getAll(req.params.arg)))
        res.status(200).send(body)
    } catch (e) {
        res.status(500).send({ msg: e })
    }
})

router.delete('/all', async (req, res) => {
    try {
        const body = JSON.stringify(await timelog.timer(() => mongoClient.deleteAll()))
        res.status(200).send(body)
    } catch (e) {
        res.status(500).send({ msg: e })
    }
})


module.exports = router