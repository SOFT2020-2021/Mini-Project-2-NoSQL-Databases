'use strict'

const fs = require('fs')

module.exports.getData = () => {
    const json = fs.readFileSync(__dirname + '/../data/movies.json')
    return JSON.parse(json)
}