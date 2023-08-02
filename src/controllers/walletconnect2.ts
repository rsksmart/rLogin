import { IProviderInfo } from 'web3modal'

/**
 * WalletConnect 2.0 Provider Modifications
 * To be compatiable with WC2.0  the following change is needed. RLogin is not up to date with web3modal
 * and as such, this patch is needed until we can update.
 * @param providerInfo IProviderInfo
 * @returns provider
 */
export const walletConnect2Provider = (providerInfo: IProviderInfo) => {
  return {
    ...providerInfo,
    connector: async (ProviderPackage: any, options: any) => {
      const provider = new ProviderPackage(options)
      await provider.connect()
      return provider
    },
    package: {
      ...providerInfo.package,
      required: ['projectId', 'chains']
    }
  }
}
