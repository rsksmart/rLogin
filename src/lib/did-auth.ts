import axios from 'axios'
import { EIP1193Provider, personalSign } from './provider'
import { verifyDidJwt } from './jwt'
import { SD } from './sdr'

import { RLOGIN_REFRESH_TOKEN, RLOGIN_ACCESS_TOKEN } from '../constants'

export const requestSignup = async (backendUrl: string, did: string) => {
  const { data: { challenge, sdr } } = await axios.get(backendUrl + `/request-signup/${did}`)

  if (sdr) {
    const verifiedSdr = await verifyDidJwt(sdr)

    return {
      challenge,
      sdr: {
        credentials: verifiedSdr.payload.credentials,
        claims: verifiedSdr.payload.claims
      }
    }
  } else {
    return { challenge }
  }
}

const buildMessage = (backendUrl: string, challenge: string) => `URL: ${backendUrl}\nVerification code: ${challenge}`
const storeAuthData = ({ data }: { data: { refreshToken: string, accessToken: string } }) => {
  localStorage.setItem(RLOGIN_REFRESH_TOKEN, data.refreshToken)
  localStorage.setItem(RLOGIN_ACCESS_TOKEN, data.accessToken)
}

export const confirmAuth = (
  provider: EIP1193Provider,
  address: string,
  backendUrl: string,
  did: string,
  challenge: string,
  onConnect: (provider: any) => Promise<void>,
  sd?: SD
) => personalSign(provider, address, buildMessage(backendUrl, challenge))
  .then((sig: any) => axios.post(backendUrl + '/signup', { response: { sig, did, sd } }))
  .then(storeAuthData)
  .then(() => onConnect(provider))
