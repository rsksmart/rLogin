import { EIP1193Provider, isMetamask } from './provider'
import { IIPFSCpinnerClient as DataVault } from '@rsksmart/ipfs-cpinner-client-types'

export const createDataVault = (serviceUrl:String, dataVaultClient: any) => {
  return async (provider: EIP1193Provider, did: string, address: string): Promise<DataVault> => {
    const personalSign = (data: string) => provider.request({ method: 'personal_sign', params: [data, address] })

    // eslint-disable-next-line new-cap
    return new dataVaultClient.default({
      serviceUrl,
      authManager: new dataVaultClient.AuthManager({ did, serviceUrl, personalSign }),
      encryptionManager: isMetamask(provider)
        ? await dataVaultClient.AsymmetricEncryptionManager.fromWeb3Provider(provider)
        : await dataVaultClient.SignerEncryptionManager.fromWeb3Provider(provider)
    }) as DataVault
  }
}

export const getContentsFromDataVault = (dataVault: DataVault, did: string, key: string) => dataVault!.get({ key })
  .then((contents) => contents.map(({ content }) => content))
