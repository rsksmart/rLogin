const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const didAuth = require('@rsksmart/express-did-auth')
const { SimpleSigner } = require('did-jwt')

const privateKey = '72e7d4571572838d3e0fe7ab18ea84d183beaf3f92d6c8add8193b53c1a542a2'
const serviceDid = 'did:ethr:rsk:0x45eDF63532b4dD5ee131e0530e9FB12f7DA1915c'
const serviceSigner = SimpleSigner(privateKey)
const challengeSecret = 'secret-pass'
const serviceUrl = 'http://localhost:3007'

const app = express()

app.use(cors())
app.use(bodyParser.json())

const permissioned = process.argv.length > 2 && process.argv[2] === 'permissioned'

const authMiddleware = !permissioned
  ? didAuth.default({ serviceDid, serviceSigner, serviceUrl, challengeSecret })(app)
  : didAuth.default({ serviceDid, serviceSigner, serviceUrl, challengeSecret,
    requiredCredentials: ['Email'],
    requiredClaims: ['Name'],
    signupBusinessLogic: (payload) => { console.log(payload); return true; }
  })(app)

app.use(authMiddleware)

if (process.argv.length > 2 && process.argv[2] === '--permissioned') throw new Error('Permissioned flavor not supported yet.')

const port = 3007

app.listen(port, () => console.log(`Backend started at http://localhost:${port}`))
