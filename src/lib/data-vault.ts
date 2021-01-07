import { EIP1193Provider } from './provider'

import DataVaultWebClient, { AuthManager, EncryptionManager } from '@rsksmart/ipfs-cpinner-client'

export const createDataVault = (provider: EIP1193Provider, did: string, address: string) => {
  const serviceUrl = 'https://identity.staging.rifcomputing.net'
  const personalSign = (data: string) => provider.request({ method: 'personal_sign', params: [address, data] })
  const decrypt = (hexCypher: string) => provider.request({ method: 'eth_decrypt', params: [hexCypher, address] })
  const getEncryptionPublicKey = () => provider.request({ method: 'eth_getEncryptionPublicKey', params: [address] })

  return new DataVaultWebClient({
    serviceUrl,
    authManager: new AuthManager({ did, serviceUrl, personalSign }),
    encryptionManager: new EncryptionManager({ getEncryptionPublicKey, decrypt })
  })
}

export const getContentsFromDataVault = (dataVault: DataVaultWebClient, did: string, key: string) => dataVault!.get({ key })
  .then(contents => contents.map(({ content }) => content))
