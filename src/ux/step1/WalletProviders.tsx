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
  padding: 8px;
`

const NoWalletAnchor = styled.a`
  color: #008FF7;
  text-decoration: none;
  :hover {
    color: #4386c6;
  }
`

export const WalletProviders = ({ userProviders, setLoading }: IWalletProvidersProps) => <>
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
  <Paragraph>
    <FooterWrapper>
      <LanguageSelector name="cars" id="cars">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </LanguageSelector>

      <NoWalletFooter>

        <Trans>No wallet? </Trans>
        <NoWalletAnchor href="https://developers.rsk.co/wallet/use/" target="_blank" className={ANCHOR_CLASSNAME}>
          <Trans>Get one here!</Trans>
        </NoWalletAnchor>
      </NoWalletFooter>
    </FooterWrapper>
  </Paragraph>
</>
