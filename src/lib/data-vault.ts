import { EIP1193Provider, isMetamask } from './provider'
import { IIPFSCpinnerClient as DataVault } from '@rsksmart/ipfs-cpinner-client-types'
import { DataVaultOptions } from '../Core'

export const createDataVault = async (dataVaultOptions: DataVaultOptions, provider: EIP1193Provider, did: string, address: string): Promise<DataVault> => {
  const personalSign = (data: string) => provider.request({ method: 'personal_sign', params: [data, address] })
  const serviceUrl = dataVaultOptions.serviceUrl
  // eslint-disable-next-line new-cap
  return new dataVaultOptions.package.default({
    serviceUrl,
    authManager: new dataVaultOptions.package.AuthManager({ did, serviceUrl, personalSign }),
    encryptionManager: isMetamask(provider)
      ? await dataVaultOptions.package.AsymmetricEncryptionManager.fromWeb3Provider(provider)
      : await dataVaultOptions.package.SignerEncryptionManager.fromWeb3Provider(provider)
  }) as DataVault
}

export const getContentsFromDataVault = (dataVault: DataVault, did: string, key: string) => dataVault!.get({ key })
  .then((contents) => contents.map(({ content }) => content))
