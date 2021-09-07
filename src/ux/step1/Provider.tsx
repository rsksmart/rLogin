// eslint-disable-next-line
import * as React from 'react'
import styled, { css } from 'styled-components'

import { Header3, Paragraph } from '../../ui/shared/Typography'
import {
  PROVIDER_CONTAINER_CLASSNAME,
  PROVIDER_CONTAINER_DISABLED_CLASSNAME,
  PROVIDER_ICON_CLASSNAME
} from '../../constants/cssSelectors'

// copy-pasted and adapted
// https://github.com/Web3Modal/web3modal/blob/master/src/components/Provider.tsx#L1

const ProviderIcon = styled.div`
  width: 45px;
  height: 45px;
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
`

const ProviderBox = styled.div<{ disabled: boolean }>`
  transition: background-color 0.2s ease-in-out;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.containerBackground};
  opacity: ${({ disabled }) => (disabled ? '50%' : '100%')};
  border-radius: 12px;
  padding: 10px 0;
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
  flex-direction: row;
  justify-content: center;
  margin: 10px 0 -10px 0;
`

interface IProviderProps {
  name: string;
  logo: string;
  description: string;
  onClick: () => void;
  disabled?: boolean;
}

export function Provider (props: IProviderProps) {
  const {
    name,
    logo,
    description,
    onClick,
    disabled = true,
    ...otherProps
  } = props
  return (
    <ProviderContainer disabled={disabled}>
      <ProviderBox disabled={disabled} className={`${PROVIDER_CONTAINER_CLASSNAME} ${disabled && PROVIDER_CONTAINER_DISABLED_CLASSNAME}`} onClick={onClick} {...otherProps}>
        <HeaderRow>
          <ProviderIcon className={PROVIDER_ICON_CLASSNAME}>
            <img src={logo} alt={name} />
          </ProviderIcon>
          <Header3>{name}</Header3>
        </HeaderRow>
        <Paragraph>{description}</Paragraph>
      </ProviderBox>
    </ProviderContainer>
  )
}
