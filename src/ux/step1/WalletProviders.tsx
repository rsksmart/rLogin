// eslint-disable-next-line
import React from 'react'
import styled from 'styled-components'
import { Provider } from './Provider'
import { IProviderUserOptions } from 'web3modal'
import { Header2, Paragraph } from '../../ui/shared/Typography'
import { PROVIDERS_WRAPPER_CLASSNAME, ANCHOR_CLASSNAME, PROVIDERS_FOOTER_TEXT_CLASSNAME } from '../../constants/cssSelectors'
import { Trans } from 'react-i18next'

interface IWalletProvidersProps {
  userProviders: IProviderUserOptions[]
  setLoading: () => void
  changeLanguage: (event: any) => void
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
`

const NoWalletFooter = styled.span`
  float: right;
  padding: 2px;
  
`
const FooterWrapper = styled.div`
  height: 35px;
  padding: 0 8px 0 8px;
`

const NoWalletAnchor = styled.a`
  color: #008FF7;
  text-decoration: none;
  :hover {
    color: #4386c6;
  }
`

export const WalletProviders = ({ userProviders, setLoading, changeLanguage }: IWalletProvidersProps) => <>
  <Header2>
    {userProviders.length !== 0 ? <Trans>Connect your wallet</Trans> : <Trans>No wallets found</Trans>}
  </Header2>
  <ProvidersWrapper className={PROVIDERS_WRAPPER_CLASSNAME}>
    {userProviders.map(provider =>
      provider ? (
        <Provider
          key={provider.name}
          name={provider.name}
          logo={provider.logo}
          description={provider.description}
          onClick={() => { provider.onClick(); setLoading() }}
        />
      ) : null
    )}
  </ProvidersWrapper>

  <FooterWrapper >
    <Paragraph>
      <LanguageSelector onChange={(val) => changeLanguage(val.target.value)} name="Languages" id="languages">
        <option value="en">English</option>
        <option value="es">Spanish</option>
      </LanguageSelector>

      <NoWalletFooter className={PROVIDERS_FOOTER_TEXT_CLASSNAME}>

        <Trans>No wallet? </Trans>
        <NoWalletAnchor href="https://developers.rsk.co/wallet/use/" target="_blank" className={ANCHOR_CLASSNAME}>
          <Trans>Get one here!</Trans>
        </NoWalletAnchor>
      </NoWalletFooter>
    </Paragraph>
  </FooterWrapper>

</>
