import React from 'react'
import { Provider } from './Provider'
import { IProviderUserOptions } from 'web3modal'
import { ModalCard, ModalCardProps } from '../ModalCard'

interface IWalletProvidersProps extends ModalCardProps {}

export const WalletProviders = ({ show, themeColors, userOptions, mainModalCard }: IWalletProvidersProps) => <ModalCard
  show={show} themeColors={themeColors} userOptions={userOptions} mainModalCard={mainModalCard}
>
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
</ModalCard>
