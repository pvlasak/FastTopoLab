const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use('/', express.static(__dirname + '/dist'))

app.post('/upload-message', function(req, res) {
    const payload = req.body
    console.log(payload)
    res.send({info: "Message successfully uploaded."})
})

const server = app.listen(3000, function () {
    console.log("app listening on port 3000.")
})

module.exports = {
    app,
    server
}