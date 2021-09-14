// eslint-disable-next-line
import React from 'react'
import styled, { css } from 'styled-components'
import { Provider } from './Provider'
import { IProviderUserOptions, providers } from 'web3modal'
import { Header2, Paragraph } from '../../ui/shared/Typography'
import { PROVIDERS_WRAPPER_CLASSNAME, ANCHOR_CLASSNAME, PROVIDERS_FOOTER_TEXT_CLASSNAME, PROVIDERS_DEVELOPER_CLASSNAME } from '../../constants/cssSelectors'
import { Trans } from 'react-i18next'
import { ThemeSwitcher } from '../../ui/shared/ThemeSwitch'
import { themesOptions } from '../../theme'

import { EDGE, TREZOR, LEDGER, DCENT } from './extraProviders'

interface IWalletProvidersProps {
  userProviders: IProviderUserOptions[]
  setLoading: (providerUserOption: IProviderUserOptions) => void
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

const LanguageSelector = styled.select`
  float: left;
  border: 0;
  color: ${props => props.theme.p};
  background-color: ${props => props.theme.modalBackground};
  size: 12px;
  &:focus {
    outline: none;
  }
`

const NoWalletFooter = styled.span`
  float: right;
  padding: 2px;
`
const FooterWrapper = styled.div`
  padding: 0 8px;
`

const NoWalletAnchor = styled.a`
  color: ${props => props.theme.link};
  text-decoration: none;
  :hover {
    color: ${props => props.theme.linkHover};
  }
`

const UserProvider = ({ userProvider, handleConnect }: { userProvider: IProviderUserOptions, handleConnect: (provider: any) => void }) =>
  <Provider
    key={userProvider.name}
    name={userProvider.name}
    logo={userProvider.logo}
    description=""
    disabled={!userProvider.onClick}
    onClick={() => handleConnect(userProvider)}
  />

export const userProvidersByName = (userProviders: IProviderUserOptions[]) => {
  const providersByName: { [name: string]: IProviderUserOptions } = {}
  for (const userProvider of userProviders) {
    providersByName[userProvider.name] = userProvider
  }
  return providersByName
}

export const WalletProviders = ({ userProviders, setLoading, changeLanguage, changeTheme, availableLanguages, selectedLanguageCode, selectedTheme }: IWalletProvidersProps) => {
  // the providers that are hardcoded into the layout below
  const hardCodedProviderNames = [
    providers.METAMASK.name, providers.NIFTY.name, providers.LIQUALITY.name,
    providers.WALLETCONNECT.name, providers.PORTIS.name, EDGE.name,
    LEDGER.name, TREZOR.name, DCENT.name
  ]

  const providersByName = userProvidersByName(userProviders)

  // additional providers that the developer wants to use
  const developerProviders = Object.keys(providersByName).filter((providerName: string) =>
    !hardCodedProviderNames.includes(providerName) ? providerName : null)

  // handle connect
  const handleConnect = (provider: IProviderUserOptions) => {
    setLoading(provider)
    provider.onClick()
  }

  return <>
    <Header2>
      {Object.keys(userProviders).length !== 0 ? <Trans>Connect your wallet</Trans> : <Trans>No wallets found</Trans>}
    </Header2>
    <ProvidersWrapper className={PROVIDERS_WRAPPER_CLASSNAME}>
      <ProviderRow>
        <UserProvider userProvider={providersByName[providers.METAMASK.name] || providers.METAMASK} handleConnect={handleConnect} />
        <UserProvider userProvider={providersByName[providers.NIFTY.name] || providers.NIFTY} handleConnect={handleConnect} />
        <UserProvider userProvider={providersByName[providers.LIQUALITY.name] || providers.LIQUALITY} handleConnect={handleConnect} />
      </ProviderRow>
      <ProviderRow hideMobile={true}>
        <UserProvider userProvider={providersByName[providers.WALLETCONNECT.name] || providers.WALLETCONNECT} handleConnect={handleConnect} />
      </ProviderRow>
      <ProviderRow>
        <UserProvider userProvider={providersByName[providers.PORTIS.name] || providers.PORTIS} handleConnect={handleConnect} />
        <UserProvider userProvider={providersByName[EDGE.name] || EDGE} handleConnect={handleConnect} />
      </ProviderRow>
      <ProviderRow hideMobile={true}>
        <UserProvider userProvider={providersByName[LEDGER.name] || LEDGER} handleConnect={handleConnect} />
        <UserProvider userProvider={providersByName[TREZOR.name] || TREZOR} handleConnect={handleConnect} />
        <UserProvider userProvider={providersByName[DCENT.name] || DCENT} handleConnect={handleConnect} />
      </ProviderRow>
      {developerProviders.length !== 0 && (
        <ProviderRow className={PROVIDERS_DEVELOPER_CLASSNAME}>
          {developerProviders.map((providerName: string) =>
            <UserProvider
              key={providerName}
              userProvider={providersByName[providerName]}
              handleConnect={handleConnect} />
          )}
        </ProviderRow>
      )}
    </ProvidersWrapper>
    <FooterWrapper >
      <Paragraph>
        { availableLanguages?.length > 1 &&
        <LanguageSelector onChange={(val) => changeLanguage(val.target.value)} defaultValue={selectedLanguageCode} name="languages" id="languages">
          {availableLanguages.map(availableLanguage =>
            <option key={availableLanguage.code} value={availableLanguage.code} >{availableLanguage.name}</option>
          )}
        </LanguageSelector>}
        <ThemeSwitcher theme={selectedTheme} onChange={changeTheme}></ThemeSwitcher>
        <NoWalletFooter className={PROVIDERS_FOOTER_TEXT_CLASSNAME}>

          <Trans>No wallet? </Trans>
          <NoWalletAnchor href="https://developers.rsk.co/wallet/use/" target="_blank" className={ANCHOR_CLASSNAME}>
            <Trans>Get one here!</Trans>
          </NoWalletAnchor>
        </NoWalletFooter>
      </Paragraph>
    </FooterWrapper>
  </>
}
