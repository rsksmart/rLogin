import axios, { AxiosResponse } from 'axios'
import { EIP1193Provider, personalSign } from './provider'
import { verifyDidJwt } from './jwt'
import { SD } from './sdr'

export type AuthKeys = { refreshToken: string, accessToken: string }

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

export const confirmAuth = (
  provider: EIP1193Provider,
  address: string,
  backendUrl: string,
  did: string,
  challenge: string,
  onConnect: (provider: any, authKeys: AuthKeys) => Promise<void>,
  sd?: SD
) => personalSign(provider, address, buildMessage(backendUrl, challenge))
  .then((sig: any) => axios.post(backendUrl + '/signup', { response: { sig, did, sd } }))
  .then((response: AxiosResponse<AuthKeys>) => onConnect(provider, response.data))
