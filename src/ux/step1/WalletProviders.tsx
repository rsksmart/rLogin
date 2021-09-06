// eslint-disable-next-line
import React from 'react'
import styled from 'styled-components'
import { Provider } from './Provider'
import { IProviderInfo, IProviderUserOptions } from 'web3modal'
import { Header2, Paragraph } from '../../ui/shared/Typography'
import { PROVIDERS_WRAPPER_CLASSNAME, ANCHOR_CLASSNAME, PROVIDERS_FOOTER_TEXT_CLASSNAME } from '../../constants/cssSelectors'
import { Trans } from 'react-i18next'
import { ThemeSwitcher } from '../../ui/shared/ThemeSwitch'
import { themesOptions } from '../../theme'

import { providers } from 'web3modal'
import { EDGE, TREZOR, LEDGER, DCENT } from './extraProviders'

interface IWalletProvidersProps {
  userProviders: { [name: string]: IProviderUserOptions }
  setLoading: () => void
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
  cursor: pointer;
  padding: 8px;
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

const UserProvider = ({ provider, userProvider, setLoading, width }: { provider: IProviderInfo, userProvider: IProviderUserOptions, setLoading: () => void, width: string }) => <Provider
  key={provider.name}
  name={provider.name}
  logo={provider.logo}
  description=""
  disabled={!userProvider}
  onClick={userProvider ? () => { userProvider.onClick(); setLoading() } : () => {}}
  width={width}
/>

export const WalletProviders = ({ userProviders, setLoading, changeLanguage, changeTheme, availableLanguages, selectedLanguageCode, selectedTheme }: IWalletProvidersProps) => <>
  <Header2>
    {Object.keys(userProviders).length !== 0 ? <Trans>Connect your wallet</Trans> : <Trans>No wallets found</Trans>}
  </Header2>
  <ProvidersWrapper className={PROVIDERS_WRAPPER_CLASSNAME}>
    <div style={{ width: '100%' }}>
      <UserProvider width='100%' provider={providers.WALLETCONNECT} userProvider={userProviders[providers.WALLETCONNECT.name]} setLoading={setLoading} />
    </div>
    <div style={{ width: '100%' }}>
      <UserProvider width='33%' provider={providers.METAMASK} userProvider={userProviders[providers.METAMASK.name]} setLoading={setLoading} />
      <UserProvider width='33%' provider={providers.NIFTY} userProvider={userProviders[providers.NIFTY.name]} setLoading={setLoading} />
      <UserProvider width='33%' provider={providers.LIQUALITY} userProvider={userProviders[providers.LIQUALITY.name]} setLoading={setLoading} />
    </div>
    <div style={{ width: '100%' }}>
      <UserProvider width='50%' provider={providers.PORTIS} userProvider={userProviders[providers.PORTIS.name]} setLoading={setLoading} />
      <UserProvider width='50%' provider={EDGE} userProvider={userProviders[EDGE.name]} setLoading={setLoading} />
    </div>
    <div style={{ width: '100%' }}>
      <UserProvider width='33%' provider={LEDGER} userProvider={userProviders[LEDGER.name]} setLoading={setLoading} />
      <UserProvider width='33%' provider={TREZOR} userProvider={userProviders[TREZOR.name]} setLoading={setLoading} />
      <UserProvider width='33%' provider={DCENT} userProvider={userProviders[DCENT.name]} setLoading={setLoading} />
    </div>
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

