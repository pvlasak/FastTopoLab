const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { MongoClient} = require('mongodb')


const url = 'mongodb://admin:password@localhost:27017'
const client = new MongoClient(url)

const dbName = 'companydb'
const collName = 'customers'

app.use(bodyParser.json())
app.use('/', express.static(__dirname + '/dist'))

app.post('/upload-message', async function(req, res) {
    const payload = req.body
    console.log(payload)
    await client.connect()
    console.log("Connected successfully to database.")

    //initiate or get the database & collection
    const db = client.db(dbName)
    const collection = db.collection(collName)

    await collection.insertOne(payload)
    res.send({info: "Message successfully uploaded."})
})

const server = app.listen(3000, function () {
    console.log("app listening on port 3000.")
})

module.exports = {
    app,
    server
}