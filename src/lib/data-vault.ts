import { EIP1193Provider, isMetamask } from './provider'

export const createDataVault = (serviceUrl:String, dataVaultClient: any) => {
  return async (provider: EIP1193Provider, did: string, address: string) => {
    const personalSign = (data: string) => provider.request({ method: 'personal_sign', params: [data, address] })

    // eslint-disable-next-line new-cap
    return new dataVaultClient.default({
      serviceUrl,
      authManager: new dataVaultClient.AuthManager({ did, serviceUrl, personalSign }),
      encryptionManager: isMetamask(provider)
        ? await dataVaultClient.AsymmetricEncryptionManager.fromWeb3Provider(provider)
        : await dataVaultClient.SignerEncryptionManager.fromWeb3Provider(provider)
    })
  }
}

export const getContentsFromDataVault = (dataVault: any, did: string, key: string) => dataVault!.get({ key })
  .then((contents: { content: any }[]) => contents.map(({ content }) => content))
