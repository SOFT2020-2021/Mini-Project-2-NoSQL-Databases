Your task is to select two or more databases of different NoSQL types and to compare their features
and performance in storing, scaling, providing, and processing big data.
Your solution includes
- preparing a large data source and loading it into both databases


- Importing data
 We have found a dataset online containing movies with their respective release year, actors and qualified genres. This dataset is approximately containing 15500 movies spanning 151000 lines of formatted json. 

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