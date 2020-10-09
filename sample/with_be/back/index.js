const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyParser.json())

let challenge = {
  challenge: 1000
}

if(process.argv.length > 2 && process.argv[2] === '--permissioned') challenge.sdr = ['EmailCredential']

app.post('/request_auth', function (req, res) {
  console.log(req.body.did)
  res.status(200).send(challenge)
})

app.post('/auth', function (req, res) {
  console.log(req.body.response)

  res.status(200).send('access token')
})

const port = 3007

app.listen(port, () => console.log(`Backend started at http://localhost:${port}`))
