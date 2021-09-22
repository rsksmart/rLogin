// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Trans } from 'react-i18next'
import styled from 'styled-components'
import { PROVIDERS_FOOTER_TEXT_CLASSNAME, ANCHOR_CLASSNAME } from '../../constants/cssSelectors'
import { themesOptions } from '../../theme'
import { ThemeSwitcher } from '../../ui/shared/ThemeSwitch'
import { Paragraph } from '../../ui/shared/Typography'

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 1em;
  padding: 0 8px;
`

const FooterColumn = styled.div<{ align: 'left' | 'center' | 'right' }>`
  display: flex;
  flex-grow: 1;
  width: 33%;
  justify-content: ${({ align }) => align};

  a {
    color: ${props => props.theme.link};
    text-decoration: none;
    :hover {
      color: ${props => props.theme.linkHover};
    }
  }
`

const LanguageSelector = styled.select`
  border: 0;
  color: ${props => props.theme.p};
  background-color: ${props => props.theme.modalBackground};
  size: 12px;
  &:focus {
    outline: none;
  }
`

interface Interface {
  changeLanguage: (event: any) => void
  changeTheme: (theme: themesOptions) => void
  availableLanguages: { code:string, name:string } []
  selectedLanguageCode: string
  selectedTheme: themesOptions
}

const WalletProvidersFooter: React.FC<Interface> = ({
  changeLanguage, changeTheme, availableLanguages, selectedTheme, selectedLanguageCode
}) => {
  return (
    <FooterWrapper >
      { availableLanguages?.length > 1 &&
      <FooterColumn align="left">
        <LanguageSelector onChange={(val) => changeLanguage(val.target.value)} defaultValue={selectedLanguageCode} name="languages" id="languages">
          {availableLanguages.map(availableLanguage =>
            <option key={availableLanguage.code} value={availableLanguage.code} >{availableLanguage.name}</option>
          )}
        </LanguageSelector>
      </FooterColumn>}

      <FooterColumn align="center">
        <ThemeSwitcher theme={selectedTheme} onChange={changeTheme}></ThemeSwitcher>
      </FooterColumn>

      <FooterColumn align="right">
        <Paragraph className={PROVIDERS_FOOTER_TEXT_CLASSNAME}>
          <Trans>No wallet? </Trans>
          <a href="https://developers.rsk.co/wallet/use/" target="_blank" rel="noreferrer" className={ANCHOR_CLASSNAME}>
            <Trans>Get one here!</Trans>
          </a>
        </Paragraph>
      </FooterColumn>
    </FooterWrapper>
  )
}

export default WalletProvidersFooter
