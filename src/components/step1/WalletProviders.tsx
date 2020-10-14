import React from 'react'
import { Provider } from './Provider'
import { IProviderUserOptions, ThemeColors } from 'web3modal'

interface IWalletProvidersProps {
  themeColors: ThemeColors
  userOptions: IProviderUserOptions[]
}

export const WalletProviders = ({ themeColors, userOptions }: IWalletProvidersProps) => <>
  {userOptions.map(provider =>
    provider ? (
      <Provider
        key={provider.name}
        name={provider.name}
        logo={provider.logo}
        description={provider.description}
        themeColors={themeColors}
        onClick={provider.onClick}
      />
    ) : null
  )}
</>
