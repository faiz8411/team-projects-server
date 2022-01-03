const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const ObjectId = require("mongodb").ObjectId

const { MongoClient } = require('mongodb');

const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wusl0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(uri)
async function run() {
    try {
        await client.connect()
        // console.log('data in')
        const database = client.db('teams')
        const serviceCollection = database.collection('service')

        app.post('/addService', async (req, res) => {
            console.log(req.body)
            const result = await serviceCollection.insertOne(req.body)
            res.send(result)
        })
    } finally {

    }
}
run().catch(console.dir)
app.get('/', (req, res) => {
    res.send('Hello my team')
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})