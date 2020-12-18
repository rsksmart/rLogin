import { Resolver } from 'did-resolver'
import { getResolver } from 'ethr-did-resolver'
import { verifyJWT } from 'did-jwt'

const ethrDidResolver = getResolver({
  networks: [
    {
      name: 'rsk',
      registry: '0xdca7ef03e98e0dc2b855be647c39abe984fcf21b',
      rpcUrl: 'https://did.rsk.co:4444'
    }
  ]
})

const resolver = new Resolver(ethrDidResolver)

export const verifyDidJwt = (jwt: string) => verifyJWT(
  jwt,
  { resolver }
)
