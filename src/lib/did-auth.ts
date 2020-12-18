import axios from 'axios'
import { EIP1193Provider } from './provider'
import { verifyDidJwt } from './jwt'
import { SD } from './sdr'
import { RLOGIN_REFRESH_TOKEN, RLOGIN_ACCESS_TOKEN } from '../constants'

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

export const confirmAuth = (
  provider: EIP1193Provider,
  address: string,
  backendUrl: string,
  did: string,
  challenge: string,
  onConnect: (provider: any) => Promise<void>,
  sd?: SD
) => provider.request({ method: 'personal_sign', params: [`Login to ${backendUrl}\nVerification code: ${challenge}`, address] })
  .then((sig: any) => axios.post(backendUrl + '/signup', { response: { sig, did, sd } }))
  .then(({ data }: { data: { refreshToken: string, accessToken: string } }) => {
    localStorage.setItem(RLOGIN_REFRESH_TOKEN, data.refreshToken)
    localStorage.setItem(RLOGIN_ACCESS_TOKEN, data.accessToken)
  })
  .then(() => onConnect(provider))
