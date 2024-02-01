const express = require('express')
const cors = require('cors')
const didAuth = require('@rsksmart/express-did-auth')
const { SimpleSigner } = require('did-jwt')

// This private key must not be used in production. This is just a sample application.
// Never use harcoded private keys in your project.
const privateKey = '72e7d4571572838d3e0fe7ab18ea84d183beaf3f92d6c8add8193b53c1a542a2'
const serviceDid = 'did:ethr:rsk:0x45eDF63532b4dD5ee131e0530e9FB12f7DA1915c'
const serviceSigner = SimpleSigner(privateKey)
const challengeSecret = 'secret-pass'
const serviceUrl = 'http://localhost:3007'

const app = express()

app.use(cors())
app.use(express.json())

const permissioned = process.argv.length > 2 && process.argv[2] === 'permissioned'

const didAuthConfig = {
  serviceDid,
  serviceSigner,
  serviceUrl,
  challengeSecret
}

const authMiddleware = !permissioned
  ? didAuth.default(didAuthConfig)(app)
  : didAuth.default({
    ...didAuthConfig,
    requiredCredentials: ['Email'],
    requiredClaims: ['Name'],
    signupBusinessLogic: (payload) => {
      if (!payload.sd.credentials.Email) { throw new Error('The Email is required.') }
      if (!payload.sd.claims.Name) { throw new Error('The Name is required.') }

      // return true is an email credential and name declarative detail is provided
      return true
    }
  })(app)

app.use(authMiddleware)

if (process.argv.length > 2 && process.argv[2] === '--permissioned') throw new Error('Permissioned flavor not supported yet.')

const port = 3007

app.listen(port, () => console.log(`Backend started at http://localhost:${port}`))
