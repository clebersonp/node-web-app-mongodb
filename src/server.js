const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const cors = require('cors');
// to use locally
// process.env.MONGODB_URL=localhost:27017
// to use with docker network
// process.env.MONGODB_URL=mongodb
const mongodbBaseUrl = 'mongodb://admin:admin@';
const mongodbLocal = mongodbBaseUrl + 'localhost:27017';
const mongodbUrl = process.env.MONGODB_URL ? mongodbBaseUrl + process.env.MONGODB_URL : mongodbBaseUrl + mongodbLocal;
console.log('Mongodb URL: ' + mongodbUrl);
// use with docker container
// mongodbUrl = "mongodb://admin:admin@mongodb";
const client = new MongoClient(mongodbUrl);
const bodyParser = require('body-parser');

// app port
const port = 3000;

// express instance
const app = express();

// configure bodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// bypass all origin request
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// "user-db"
const databaseName = 'user-db';
const dbCollection = 'users';


app.get('/users', async (req, res) => {
    let response = {};

    let query = { userId: 1 };

    await client.connect();
    const db = client.db(databaseName);
    await db.collection(dbCollection).findOne(query)
        .then(result => response = result)
        .catch(console.error)
        .finally(() => client.close());
    // send response
    res.send(response ? response : {});
});

app.post('/users', async (req, res) => {
    let userObj = req.body;

    let newValues = { $set: userObj };
    let query = { userId: 1 };

    await client.connect();
    const db = client.db(databaseName);
    const userCollection = db.collection(dbCollection);
    await userCollection.updateOne(query, newValues, { upsert: true })
        .catch(console.error)
        .finally(() => client.close());
    // send response
    res.send(userObj);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});