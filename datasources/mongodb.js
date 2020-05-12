const DATABASE_NAME = process.env.DATABASE_NAME || "movie_database"
const MongoClient = require('mongodb').MongoClient
const MONGO_PORT = process.env.MONGOPORT || 27017
const mongoUrl = `mongodb://localhost:${MONGO_PORT}`
const collection = "movies"

const client = new MongoClient(mongoUrl, { useUnifiedTopology: true })
let db = undefined

module.exports = {
    /*
        A Connection Pool is a cache of database connections maintained by the driver so that connections can be re-used
        when new connections to the database are required. To reduce the number of connection pools created by your application,
        we recommend calling MongoClient.connect once and reusing the database variable returned by the callback:
    */
    connect: () => {
        client.connect((err) => {
            if (err) {
                throw new Error('could not connect to mongoclient', err)
            }
            db = client.db(DATABASE_NAME)
            console.log(`connected to mongodb on: "${mongoUrl}" on database: "${DATABASE_NAME}" using collection: "${collection}"`)
        })
    },
    insertAll: (documents) => {
        return new Promise((resolve, reject) => {
            db.collection(collection).insertMany(documents, (err, result) => {
                if (err) reject(err)
                resolve({ insertedDocuments: result.insertedCount })
            })
        })
    },
    getAll: async (arg) => {
        return new Promise((resolve, reject) => {
            db.collection(collection).find({}).toArray((err, result) => {
                if (err) reject(err)
                switch (arg) {
                    case "time": {
                        resolve({})
                    }
                    case "aggregate": {
                        resolve(
                            {
                                msg: "inaccurate time due to javascript aggregation",
                                receivedDocuments: Object.keys(result).length
                            }
                        )
                    }
                    case "data": {
                        resolve(
                            {
                                msg: "gl",
                                result
                            }
                        )
                    }
                    default: {
                        resolve(
                            {
                                msg: "please provide argument"
                            }
                        )
                    }
                }
            })
        })
    },
    updateAll: async (name) => {
        return new Promise((resolve, reject) => {
            const query = {}
            const data = { $set: { cast: [name] } }
            db.collection(collection).updateMany(query, data, (err, collection) => {
                if (err) reject(err)
                resolve({ "modified": collection.result.nModified })
            })
        })
    },
    deleteAll: () => {
        return new Promise((resolve, reject) => {
            db.collection(collection).remove({}, function (err, result) {
                if (err) reject(err)
                resolve({ removed: result.result.n })
            })
        })
    },
    close: () => {
        db.close()
    },
}