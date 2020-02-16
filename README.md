# BlogList Exercise

This is an [exercise project found in part 7](https://fullstackopen.com/en/part7/exercises_extending_the_bloglist) of [Full Stack Open](https://fullstackopen.com/), an introductory course in Javascript Web Development.

In order to run this project you will need to install [Node.js](https://nodejs.org/en/). You will also need an access to a [mongoDB](https://www.mongodb.com/) database -- I used [Atlas](https://www.mongodb.com/cloud/atlas), MongoDB's cloud service, which was suggested in the course.

You will also need to create a configuration file named `.env` in the `bloglist-backend` directory, and include the following with the appropriate configurations: 

```
PORT=3003
MONGODB_URI=<mongodb uri for production>
TEST_MONGODB_URI=<mongodb uri for testing>

SECRET=<This is for hashing password>
```