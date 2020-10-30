const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const uuid = require('uuid')

const app = express()

app.use(cors())
app.use(bodyParser.json())

let challenge = {}

if(process.argv.length > 2 && process.argv[2] === '--permissioned') challenge.sdr = ['EmailCredential']

app.post('/request_auth', function (req, res) {
  console.log(req.body.did)
  challenge.challenge = Math.floor(Math.random() * 12345)
  res.status(200).send(challenge)
})

app.post('/auth', function (req, res) {
  console.log(req.body.response)

  // verify response signature
  // compare challenge
  // verify credentials
  // perform business logic

  res.status(200).send(uuid.v4())
})

const port = 3007

app.listen(port, () => console.log(`Backend started at http://localhost:${port}`))
