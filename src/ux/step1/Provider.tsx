// eslint-disable-next-line
import * as React from 'react'
import styled from 'styled-components'

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
  margin: 0 15px;
  overflow: visible;
  box-shadow: none;
  justify-content: center;
  align-items: center;
  & img {
    width: 100%;
    height: 100%;
  }
`

const ProviderContainer = styled.div<{ width: string, disabled: boolean }>`
  width: ${({ width }) => width};
  float: left;
  align-items: center;
  border-radius: 12px;
`

const ProviderBox = styled.div<{ disabled: boolean }>`
  transition: background-color 0.2s ease-in-out;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.containerBackground};
  opacity: ${({ disabled }) => (disabled ? '50%' : '100%')};
  border-radius: 12px;
  margin-bottom: 15px;
  padding: 5px 0;
  ${({ disabled }) => !disabled && `
  :hover {
    background-color: ${(props: any) => props.theme.containerBackgroundHover};;
  }`}
  @media screen and (max-width: 768px) {
    padding: 1vw;
  }
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
  width: string
}

export function Provider (props: IProviderProps) {
  const {
    name,
    logo,
    description,
    onClick,
    disabled = true,
    width,
    ...otherProps
  } = props
  return (
    <ProviderContainer disabled={disabled} width={width}>
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
