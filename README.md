# Mini-project 2: NoSQL Databases
Your task is to select two or more databases of different NoSQL types and to compare their featuresc and performance in storing, scaling, providing, and processing big data.
- Importing data
  - We have found a dataset online containing movies with their respective release year, actors and qualified genres. This dataset is approximately containing 15500 movies spanning 151000 lines of formatted json. 

- We have chosen to compare Redis and MongoDB for this mini project.

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



# Note til Jonas' konklusion 

### Pros / cons of Redis vs MongoDB
- Redis is volatile, therefor a shutdown of the server is lethal, as it will wipe the data stored.
- Redis er en bedre database hvor søge punkter er nemmere at finde, også hvis de skal genbruges








Redis
```
Using a normal Redis client to perform mass insertion is not a good idea for a few reasons: the naive approach of sending one command after the other is slow because you have to pay for the round trip time for every command. It is possible to use pipelining, but for mass insertion of many records you need to write new commands while you read replies at the same time to make sure you are inserting as fast as possible.

Only a small percentage of clients support non-blocking I/O, and not all the clients are able to parse the replies in an efficient way in order to maximize throughput. For all of these reasons the preferred way to mass import data into Redis is to generate a text file containing the Redis protocol, in raw format, in order to call the commands needed to insert the required data.

For instance if I need to generate a large data set where there are billions of keys in the form: `keyN -> ValueN' I will create a file containing the following commands in the Redis protocol format:
``` 
- selecting appropriate criteria for comparison, such as access time, storage space,
complexity, versioning, security, or similar
- creating demo code for testing the selected database operations against the selected
comparison criteria
- reporting the results and conclusions.
It is recommended to consider using ACID and CAP as reference.
Your conclusion would contribute to the recommendations for making choices of database types for
specific use cases.
