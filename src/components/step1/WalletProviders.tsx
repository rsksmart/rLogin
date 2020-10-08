import React from 'react'
import styled from 'styled-components'

import { Provider } from './Provider'
import { MODAL_CARD_CLASSNAME, ThemeColors, IProviderUserOptions } from 'web3modal'


interface IModalCardStyleProps {
  show: boolean;
  themeColors: ThemeColors;
  maxWidth?: number;
}

interface IWalletProvidersProps {
  show: boolean
  themeColors: ThemeColors
  userOptions: IProviderUserOptions[]
  mainModalCard: HTMLDivElement | null | undefined
}

const SModalCard = styled.div<IModalCardStyleProps>`
  position: relative;
  width: 100%;
  background-color: ${({ themeColors }) => themeColors.background};
  border-radius: 12px;
  margin: 10px;
  padding: 0;
  opacity: ${({ show }) => (show ? 1 : 0)};
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  pointer-events: ${({ show }) => (show ? 'auto' : 'none')};

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  max-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}px` : '800px')};
  min-width: fit-content;
  max-height: 100%;
  overflow: auto;

  @media screen and (max-width: 768px) {
    max-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}px` : '500px')};
    grid-template-columns: 1fr;
  }
`

export const WalletProviders = ({ show, themeColors, userOptions, mainModalCard }: IWalletProvidersProps) => <SModalCard
  className={MODAL_CARD_CLASSNAME}
  show={show}
  themeColors={themeColors}
  maxWidth={userOptions.length < 3 ? 500 : 800}
  ref={c => (mainModalCard = c)}
  >
  {userOptions.map(provider =>
    provider ? (
      <Provider
        name={provider.name}
        logo={provider.logo}
        description={provider.description}
        themeColors={themeColors}
        onClick={provider.onClick}
      />
    ) : null
  )}
</SModalCard>
