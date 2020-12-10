// eslint-disable-next-line
import * as React from 'react'
import styled from 'styled-components'

import { Header3, Paragraph } from '../../ui/shared/Typography'
import {
  PROVIDER_CONTAINER_CLASSNAME,
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

  @media screen and (max-width: 768px) {
    width: 8.5vw;
    height: 8.5vw;
  }
`

const ProviderContainer = styled.div`
  transition: background-color 0.2s ease-in-out;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #F2F2F2;
  border-radius: 12px;
  margin-bottom: 15px;
  padding: 5px 0;
  :hover {
    background-color: #E4E4E4;
  }
  @media screen and (max-width: 768px) {
    padding: 1vw;
  }
`

const HeaderRow = styled.div`
  width: 100%;
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
}

export function Provider (props: IProviderProps) {
  const {
    name,
    logo,
    description,
    onClick,
    ...otherProps
  } = props
  return (
    <ProviderContainer className={PROVIDER_CONTAINER_CLASSNAME} onClick={onClick} {...otherProps}>
      <HeaderRow>
        <ProviderIcon className={PROVIDER_ICON_CLASSNAME}>
          <img src={logo} alt={name} />
        </ProviderIcon>
        <Header3>{name}</Header3>
      </HeaderRow>

      <Paragraph>{description}</Paragraph>
    </ProviderContainer>
  )
}
