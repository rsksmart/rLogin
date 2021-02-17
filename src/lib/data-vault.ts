import { EIP1193Provider } from './provider'

import DataVaultWebClient, { AuthManager, EncryptionManager } from '@rsksmart/ipfs-cpinner-client'
import { DECRYPT_ERROR } from '../constants'

export const createDataVault = (provider: EIP1193Provider, did: string, address: string) => {
  const serviceUrl = 'https://identity.staging.rifcomputing.net'
  const personalSign = (data: string) => provider.request({ method: 'personal_sign', params: [data, address] })

  const decrypt = (provider.isMetaMask && !provider.isNifty)
    ? (hexCypher: string) => provider.request({ method: 'eth_decrypt', params: [hexCypher, address] })
    : (_hexCypher: string) => Promise.reject(DECRYPT_ERROR)

  const getEncryptionPublicKey = () => provider.request({ method: 'eth_getEncryptionPublicKey', params: [address] })

  return new DataVaultWebClient({
    serviceUrl,
    authManager: new AuthManager({ did, serviceUrl, personalSign }),
    encryptionManager: new EncryptionManager({ getEncryptionPublicKey, decrypt })
  })
}

export const getContentsFromDataVault = (dataVault: DataVaultWebClient, did: string, key: string) => dataVault!.get({ key })
  .then(contents => contents.map(({ content }) => content))
