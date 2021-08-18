// eslint-disable-next-line
import React from 'react'
import styled from 'styled-components'
import { ThemeType } from '../../theme'
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
  background-color: ${props => props.theme.secondaryBackground};
  border-radius: 12px;
  padding: 12px;
  font-size: 15px;
  color:  ${props => props.theme.secondaryText};
  font-weight: 500 !important;

  :hover {
    background-color:  ${props => props.theme.secondaryHoverBackground};
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
  ${(props: { isTestnet: boolean, theme:ThemeType }) => props.isTestnet && ('color:' + props.theme.testnetText)}
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
