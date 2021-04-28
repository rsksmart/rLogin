import { EIP1193Provider, isMetamask } from './provider'
import DataVaultWebClient, { AuthManager, AsymmetricEncryptionManager, SignerEncryptionManager } from '@rsksmart/ipfs-cpinner-client'

export const createDataVault = async (provider: EIP1193Provider, did: string, address: string) => {
  const serviceUrl = 'https://data-vault.identity.rifos.org'
  const personalSign = (data: string) => provider.request({ method: 'personal_sign', params: [data, address] })

  return new DataVaultWebClient({
    serviceUrl,
    authManager: new AuthManager({ did, serviceUrl, personalSign }),
    encryptionManager: isMetamask(provider)
      ? await AsymmetricEncryptionManager.fromWeb3Provider(provider)
      : await SignerEncryptionManager.fromWeb3Provider(provider)
  })
}

export const getContentsFromDataVault = (dataVault: DataVaultWebClient, did: string, key: string) => dataVault!.get({ key })
  .then(contents => contents.map(({ content }) => content))
