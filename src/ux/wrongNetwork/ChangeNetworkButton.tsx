// eslint-disable-next-line
import React from 'react'
import styled from 'styled-components'
import { AddEthereumChainParameter } from './changeNetwork'

interface ChangeNetworkButtonInterface {
  params: AddEthereumChainParameter | undefined,
  changeNetwork: (params: AddEthereumChainParameter) => void
}

const NetworkButton = styled.button`
  display: block;
  width: 100%;
  cursor: pointer;
  border: none;
  background-color: #F2F2F2;
  border-radius: 12px;
  padding: 12px;
  font-size: 15px;
  color: #6C6B6C;
  font-weight: 500 !important;

  :hover {
    background-color: #E4E4E4;
  }

  :focus {
    outline:0;
  }
`
type IconBoxType = {
  url: string,
  isTestnet: boolean
}

const IconBox = styled.span`
  display: inline-block;
  width: 45px;
  height: 45px;
  background-image: url(${(props: IconBoxType) => props.url});
  background-size: cover;
  vertical-align: middle;
  ${(props: IconBoxType) => props.isTestnet && 'filter: grayscale(100%);'}
  margin-top: -2px;
`

const ChainName = styled.span`
  display: inline-block;
  ${(props: { isTestnet: boolean }) => props.isTestnet && 'color: #AAAAAA;' }
`

const ChangeNetworkButton: React.FC<ChangeNetworkButtonInterface> = ({ params, changeNetwork }) =>
  params ? (
    <NetworkButton
      className={`changeNetwork chain${parseInt(params.chainId)}`}
      onClick={() => changeNetwork(params)}>
      {params.iconUrls && params.iconUrls[0] && <IconBox className="icon" url={params.iconUrls[0]} isTestnet={params.chainName.toLowerCase().endsWith('testnet')} />}
      <ChainName isTestnet={params.chainName.toLowerCase().endsWith('testnet')}>{params.chainName}</ChainName>
    </NetworkButton>
  ) : <></>

export default ChangeNetworkButton
