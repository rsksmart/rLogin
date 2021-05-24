import { IProviderUserOptions, verifyInjectedProvider } from 'web3modal'

// @ts-ignore
import * as RWalletLogo from './logos/rWalletlogo.svg'
// @ts-ignore
import * as MathWalletLogo from './logos/mathWalletLogo.png'

/**
 * A list of injected Providers that have not been implemented into Web3Modal yet
 */
const injectedProviders = [
  {
    name: 'RWallet',
    check: 'isRWallet',
    logo: RWalletLogo.default
  },
  {
    name: 'Math Wallet',
    check: 'isMathWallet',
    logo: MathWalletLogo.default
  }
]

/**
 * Takes an array of Web3 Providers from web3modal and checks if the first item is
 * Metamask or Web3. If true, add additional checks to see if it matches the providers
 * above. If so, rewrite provider
 * @param providers an array of providers from web3Modal
 * @returns updated array of providers
 */
export const checkRLoginInjectedProviders = (providers: IProviderUserOptions[]) => {
  // if the first item is not Web3 or Metamask return the array
  if (providers[0].name !== 'Web3' && providers[0].name !== 'MetaMask') {
    return providers
  }

  let firstProvider = providers[0]

  // loop through list above to see if one matches
  injectedProviders.map((item: any) => {
    if (verifyInjectedProvider(item.check)) {
      firstProvider = { ...firstProvider, name: item.name, logo: item.logo }
    }
  })

  return [firstProvider, ...providers.slice(1)]
}
