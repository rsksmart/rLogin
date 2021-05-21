import { IProviderUserOptions, verifyInjectedProvider } from 'web3modal'

// @ts-ignore
import * as RWalletLogo from './logo.svg'

/**
 * A list of injected Providers that have not been implemented into Web3Modal yet
 */
const injectedProviders = [
  {
    name: 'RWallet',
    check: 'isJesseWallet',
    logo: RWalletLogo.default
  }
]

export const checkRLoginInjectedProviders = (provider: IProviderUserOptions) => {
  // if the first item is not Web3 return it
  if (provider.name !== 'Web3') return provider

  // see if the name and logo need to be updated:
  let updatedItem = provider
  injectedProviders.map((item: any) => {
    if (verifyInjectedProvider(item.check)) {
      updatedItem = { ...updatedItem, name: item.name, logo: item.logo }
    }
  })

  console.log('updatedItem', updatedItem)
  return updatedItem
}
