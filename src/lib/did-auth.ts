import axios from 'axios'
import { EIP1193Provider } from './provider'
import { verifyDidJwt } from './jwt'
import { createDataVault } from './data-vault'

export const requestSignup = async (backendUrl: string, did: string, address: string, provider: EIP1193Provider) => {
  const { data: { challenge, sdr } } = await axios.get(backendUrl + `/request-signup/${did}`)

  if (sdr) { // schema has selective disclosure request, permissioned app flavor
    const verifiedSdr = await verifyDidJwt(sdr)

    return {
      challenge,
      sdr: {
        credentials: verifiedSdr.payload.credentials,
        claims: verifiedSdr.payload.claims
      }
    }
  } else { // open app flavor
    return { challenge }
  }
}
