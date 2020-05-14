# Mini-project 2: NoSQL Databases
Your task is to select two or more databases of different NoSQL types and to compare their featuresc and performance in storing, scaling, providing, and processing big data.
- We have chosen to compare Redis and MongoDB for this mini project.

Importing data
  - We have found a dataset online containing movies with their respective release year, actors and qualified genres. This dataset is approximately containing 15500 movies spanning 151000 lines of formatted json. 


### Selecting relevant database operations, which can be used to compare the databases
The relevant operations we want to compare between Redis and MongoDB, are going to be the following:
 - insertAll
   - Function to import the big dataset.
 - getAll
   - Returning how many objects our database consists of.
 - updateAll
   - We made an update function, to change the cast for all movies, this would create "bad data", but hence this is for a test scenario, 
     we will allow it this once.
 - deleteAll
   - This function is to delete the whole database,

All of these functions have been made to return a runtime/execution time in milliseconds, as a measurement to compare between each database.

### Selecting appropriate criteria for comparison, such as access time, storage space, complexity, versioning, security, or similar
We have selected to compare on the following criterias:
- Access time
    - First of, we aren't working in a "clean environment", which means the test results will be "tainted" because of this.
    - We have used the relevant database operations, as described earlier, to test the access time of the 2 databases.
- Complexity
    - Both of these database are easy to install, but when they have to be scaled, which we haven't tried yet ourselves but read about,
    MongoDB have been said to be the easier one as Redis is getting more complicated when you want to scale it.
- Cost of hardware (such as ram)
    - Redis is going to be the more expensive choice, based on the prices of gigabytes on ram and harddrives. Since MongoDB data are being
    stored on the physical drives, and Redis data being stored in the ram.



### Creating demo code for testing the selected database operations against the selected comparison criteria

As previously mentioned, we are creating a demo program for CRUD operations on the respective databases. Our program is written in JavaScript and the operations are exposed to a client through a RESTful api. This introduces some difficulties in regards of accuracy, due to our program not being tested directly through redis and mongodb's CLI's or something equivelant. We are utilizing npm libraries for database clients, risking the possibility of inexpedient implementations, our own implementations are suboptimal in some regards and JavaScript at it's core can only do synchronous commmands. 

##### Chart of aggregated average time (ms) per query, each has been ran 20 times.

| Database | CREATE  |READ | UPDATE |  DELETE  |
| ---------|------:| -----:| ------:| --------:|
| Mongodb | 250    | 170   | 170    | 230      |
| Redis   | 220    | 145   | 300    | 20       |

## CREATE 

The create speeds were similar, with a slight edge to redis. This is expected due to the faster read speeds of ram.
However we expected the gap to be bigger than the results demonstrates, we assume it is because we utilized mongodb's insertMany (same as bulkWrite) to enhance the performance of inserting multiple json documents and autogenerating the keys. Where in redis we had to explicitly set each key and value, which lead us to first iterate through each entry in the JavaScript object, and performing a single query for each insertion.

##### mongodb
```js
    insertAll: (documents) => {
        return new Promise((resolve, reject) => {
            db.collection(collection).insertMany(documents, (err, result) => {
                if (err) reject(err)
                resolve({ insertedDocuments: result.insertedCount })
            })
        })
    },
```

##### redis
```js
    insertAll: (data) => {
        return new Promise((resolve, reject) => {
            let counter = 0
            data.forEach((movie, i) => {
                redisClient.set(movie.title, JSON.stringify(movie), function (err, _) {
                    if (err) reject(err)
                    counter++
                    if (i == data.length - 1) resolve({ insertedDocuments: counter })
                })
            })
        })
    },
```

## READ

Here we expected some more drastic changes than we actually got. Again the pattern continues with mongodb having query functinoality for multiple reads with it's ``toArray``, which again leads us to implement something seemingly careless. we are not sure about the implementation of mongodbs ``toArray``, but taking the read speed in consideration we assume it is heavily optimized, due to the fast read speeds respective to redis.

##### mongodb
```js
    getAll: async (arg) => {
        return new Promise((resolve, reject) => {
            db.collection(collection).find({}).toArray((err, result) => {
                if (err) reject(err)
                switch (arg) {
                    case "time": {
                        resolve({})
                        break;
                    }
                    case "aggregate": {
                        resolve(
                            {
                                msg: "inaccurate time due to javascript aggregation",
                                receivedDocuments: Object.keys(result).length
                            }
                        )
                        break;
                    }
                    case "data": {
                        resolve(
                            {
                                msg: "gl",
                                result
                            }
                        )
                        break;
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
```

##### redis

```js
getAll: (arg) => {
        return new Promise((resolve, reject) => {
            const results = []
            redisClient.keys('*', (err, keys) => {
                if (err) reject(err)
                keys.forEach((key, i) => {
                    redisClient.get(key, (err, value) => {
                        if (err) reject(err)
                        results.push(value)
                        if (i === keys.length - 1) {
                            switch (arg) {
                                case "time": {
                                    resolve({})
                                    break;
                                }
                                case "aggregate": {
                                    resolve(
                                        {
                                            msg: "inaccurate time due to javascript aggregation",
                                            receivedDocuments: results.length
                                        }
                                    )
                                    break;
                                }
                                case "data": {
                                    resolve(
                                        {
                                            msg: "gl",
                                            results
                                        }
                                    )
                                    break;
                                }
                                default: {
                                    resolve(
                                        {
                                            msg: "please provide argument"
                                        }
                                    )
                                }
                            }
                        }
                    })
                })
            })
        })
    },
```

## UPDATE 

The pattern continues, individual queries for redis and a updateMany (bulkUpdate) from mongodb. Mongodb actually crushes redis completely in terms of performance, being almost twice as fast. This could be a sign of slow ram and a fast SSD but the pattern would be recognized through all of the queries if that were the case. Again very suboptimal redis implementation from our side, querying all keys, iterating through them and updating them individually.

##### mongodb
```js
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
```

##### redis

```js
    updateAll: (name) => {
        return new Promise((resolve, reject) => {
            redisClient.keys('*', (err, keys) => {
                if (err) reject(err)
                keys.forEach((key, i) => {
                    redisClient.get(key, (err, value) => {
                        if (err) reject(err)
                        const movie = JSON.parse(value)
                        movie.cast = name
                        redisClient.set(key, JSON.stringify(movie), () => {
                            if (i === keys.length - 1) resolve({ 'updated documents': i })
                        })

                    })
                })
            })
        })
    },
```

## DELETE

Redis performed more than 10 times faster than mongodb in regards of flushing the entire store/collection. This time the redis library we used had functions for performing a query that affected multiple key value pairs. Even though we don't necersarily believe it considers the keys nor the values in the operation of flushing the database, it probably just flips a bunch of 1's. 

##### mongodb
```js
    deleteAll: () => {
        return new Promise((resolve, reject) => {
            db.collection(collection).remove({}, function (err, result) {
                if (err) reject(err)
                resolve({ removed: result.result.n })
            })
        })
    },
```

##### redis
```js
    deleteAll: () => {
        return new Promise((resolve, reject) => {
            redisClient.flushdb(function (err, _) {
                if (err) reject(err)
                resolve({ msg: "the database is cleared of all data" })
            });
        })
    },
```

### Pros / cons of Redis vs MongoDB
To summarize our tests, they were faulty in terms of accuracy, but they proved a point in terms of development complexity. If the tools used to operate on the database is not sufficiently sophisticated to perform the tasks, it can have serious performance consequences. Measuring the databases in terms of bulk reads and writes, and using a library without an API for redis pipelines is really like putting wooden tires on a ferrari before a race.
Redis should outcompete mongodb performancewise by quite a margin in these scenarios, that is the tradeoff for being volatile and living in memory. Which definitely has it's flaws in terms of scaling and persistence.
