import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { Provider } from './Provider'
import { IProviderUserOptions, providers } from 'web3modal'
import { Header2 } from '../../ui/shared/Typography'
import { PROVIDERS_WRAPPER_CLASSNAME, PROVIDERS_DEVELOPER_CLASSNAME, PROVIDERS_CUSTODIAL, PROVIDERS_HARDWARE, PROVIDERS_INJECTED, PROVIDERS_MOBILE } from '../../constants/cssSelectors'
import { Trans } from 'react-i18next'
import { themesOptions } from '../../theme'

import { TREZOR, LEDGER, DCENT, TALLYWALLET, BLOCKWALLET, ENKRYPTWALLET } from './extraProviders'
import WalletProvidersFooter from './WalletProvidersFooter'

interface IWalletProvidersProps {
  userProviders: IProviderUserOptions[]
  connectToWallet: (provider: IProviderUserOptions) => void
  changeLanguage: (event: any) => void
  changeTheme: (theme: themesOptions) => void
  availableLanguages: { code:string, name:string } []
  selectedLanguageCode: string
  selectedTheme: themesOptions
}

const ProvidersWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1em;
  padding: 8px;
`

const ProviderRow = styled.div<{ hideMobile?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 1em;

  @media screen and (max-width: 500px) {
    flex-direction: column;
    ${({ hideMobile }) => hideMobile && css`
      display: none
    `}
  }
`

export const userProvidersByName = (userProviders: IProviderUserOptions[]) => {
  const providersByName: { [name: string]: IProviderUserOptions } = {}
  for (const userProvider of userProviders) {
    providersByName[userProvider.name] = userProvider
  }
  return providersByName
}

export const WalletProviders = ({ userProviders, connectToWallet, changeLanguage, changeTheme, availableLanguages, selectedLanguageCode, selectedTheme }: IWalletProvidersProps) => {
  const [providersByName, setProvidersByName] = useState(userProvidersByName(userProviders))

  // the providers that are hardcoded into the layout below
  const hardCodedProviderNames = [
    providers.METAMASK.name, providers.NIFTY.name, providers.LIQUALITY.name, TALLYWALLET.name, BLOCKWALLET.name, ENKRYPTWALLET.name, // browser
    providers.WALLETCONNECT.name, // mobile
    providers.PORTIS.name, providers.TORUS.name, // custodial
    LEDGER.name, TREZOR.name, DCENT.name // hardware
  ]

  // Handle a update in the userProviders after the state has loaded.
  useEffect(() => {
    setProvidersByName(userProvidersByName(userProviders))
  }, [userProviders])

  // additional providers that the developer wants to use
  const developerProviders = Object.keys(providersByName).filter((providerName: string) =>
    !hardCodedProviderNames.includes(providerName) ? providerName : null)

  // handle connect
  const handleConnect = (provider: IProviderUserOptions) => connectToWallet(provider)

  return <>
    <Header2>
      {Object.keys(userProviders).length !== 0 ? <Trans>Connect your wallet</Trans> : <Trans>No wallets found</Trans>}
    </Header2>
    <ProvidersWrapper className={PROVIDERS_WRAPPER_CLASSNAME}>
      <ProviderRow className={PROVIDERS_INJECTED}>
        <Provider userProvider={providersByName[providers.METAMASK.name] || providers.METAMASK} handleConnect={handleConnect} hideIfDisabled={false} />
        <Provider userProvider={providersByName[providers.NIFTY.name] || providers.NIFTY} handleConnect={handleConnect} hideIfDisabled={true} />
        <Provider userProvider={providersByName[providers.LIQUALITY.name] || providers.LIQUALITY} handleConnect={handleConnect} hideIfDisabled={false} />
        <Provider userProvider={providersByName[TALLYWALLET.name] || TALLYWALLET} handleConnect={handleConnect} hideIfDisabled={true} />
        <Provider userProvider={providersByName[BLOCKWALLET.name] || BLOCKWALLET} handleConnect={handleConnect} hideIfDisabled={true} />
        <Provider userProvider={providersByName[ENKRYPTWALLET.name] || ENKRYPTWALLET} handleConnect={handleConnect} hideIfDisabled={true} />
      </ProviderRow>
      <ProviderRow className={PROVIDERS_MOBILE}>
        <Provider userProvider={providersByName[providers.WALLETCONNECT.name] || providers.WALLETCONNECT} handleConnect={handleConnect} hideIfDisabled={true} />
      </ProviderRow>
      <ProviderRow className={PROVIDERS_CUSTODIAL}>
        <Provider userProvider={providersByName[providers.PORTIS.name] || providers.PORTIS} handleConnect={handleConnect} hideIfDisabled={true} />
        <Provider userProvider={providersByName[providers.TORUS.name] || providers.TORUS} handleConnect={handleConnect} hideIfDisabled={true} />
      </ProviderRow>
      <ProviderRow className={PROVIDERS_HARDWARE} hideMobile={true}>
        <Provider userProvider={providersByName[LEDGER.name] || LEDGER} handleConnect={handleConnect} hideIfDisabled={true} />
        <Provider userProvider={providersByName[TREZOR.name] || TREZOR} handleConnect={handleConnect} hideIfDisabled={true} />
        <Provider userProvider={providersByName[DCENT.name] || DCENT} handleConnect={handleConnect} hideIfDisabled={true} />
      </ProviderRow>
      {developerProviders.length !== 0 && (
        <ProviderRow className={PROVIDERS_DEVELOPER_CLASSNAME}>
          {developerProviders.map((providerName: string) =>
            <Provider
              key={providerName}
              userProvider={providersByName[providerName]}
              handleConnect={handleConnect}
              hideIfDisabled={false} />
          )}
        </ProviderRow>
      )}
      <WalletProvidersFooter
        changeLanguage={changeLanguage}
        changeTheme={changeTheme}
        availableLanguages={availableLanguages}
        selectedLanguageCode={selectedLanguageCode}
        selectedTheme={selectedTheme}
      />
    </ProvidersWrapper>
  </>
}
