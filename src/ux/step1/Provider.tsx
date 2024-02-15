import * as React from 'react'
import styled, { css } from 'styled-components'

import { Header3 } from '../../ui/shared/Typography'
import {
  PROVIDER_CONTAINER_CLASSNAME,
  PROVIDER_CONTAINER_DISABLED_CLASSNAME,
  PROVIDER_ICON_CLASSNAME
} from '../../constants/cssSelectors'

// copy-pasted and adapted
// https://github.com/Web3Modal/web3modal/blob/master/src/components/Provider.tsx#L1

const ProviderIcon = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  margin: 5px 15px 0 15px;
  overflow: visible;
  box-shadow: none;
  justify-content: center;
  align-items: center;
  & img {
    width: 100%;
    height: 100%;
  }
`

const ProviderContainer = styled.div<{ disabled: boolean }>`
  flex: 1;
  align-items: center;
  border-radius: 12px;

  @media screen and (max-width: 500px) {
    ${({ disabled }) => disabled && css`
      display: none;
    `}
  }
`

const ProviderBox = styled.div<{ disabled: boolean }>`
  transition: background-color 0.2s ease-in-out;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.containerBackground};
  opacity: ${({ disabled }) => (disabled ? '50%' : '100%')};
  border-radius: 12px;
  padding: 15px 0 10px 0;
  cursor: inherit;

  ${({ disabled }) => !disabled && css`
    cursor: pointer;
    :hover {
      background-color: ${(props: any) => props.theme.containerBackgroundHover};
    }
  `}
`

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  & >*:nth-child(1) {
      flex: 3;
      text-align: left !important;
      margin-left: 38px !important;
  }
  & >*:nth-child(2) {
      margin-right: 38px;
      margin-top: 0;
  }
`

interface IProviderProps {
  userProvider: {
    name: string;
    logo: string;
    description: string;
    onClick?: () => Promise<void>;
  },
  handleConnect: (provider: any) => void
  hideIfDisabled: boolean
}

export function Provider (props: IProviderProps) {
  const {
    userProvider,
    handleConnect,
    hideIfDisabled,
    ...otherProps
  } = props
  const disabled = !userProvider.onClick

  return (hideIfDisabled && disabled) ? <></> : (
    <ProviderContainer disabled={disabled}>
      <ProviderBox
        disabled={disabled}
        className={`${PROVIDER_CONTAINER_CLASSNAME} ${disabled && PROVIDER_CONTAINER_DISABLED_CLASSNAME}`}
        onClick={disabled ? undefined : () => handleConnect(userProvider)} {...otherProps}>
        <HeaderRow>
          <Header3>{userProvider.name}</Header3>
          <ProviderIcon className={PROVIDER_ICON_CLASSNAME}>
            <img src={userProvider.logo} alt={userProvider.name} />
          </ProviderIcon>
        </HeaderRow>
      </ProviderBox>
    </ProviderContainer>
  )
}
