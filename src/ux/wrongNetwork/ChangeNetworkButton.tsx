// eslint-disable-next-line
import React from 'react'
import styled from 'styled-components'
import { AddEthereumChainParameter } from '../../lib/provider'

interface ChangeNetworkButtonInterface {
  params: AddEthereumChainParameter | undefined,
  changeNetwork: any
}

const NetworkButton = styled.button`
  display: block;
  width: 100%;
  cursor: pointer;
  border: none;
  background-color: #F2F2F2;
  border-radius: 12px;
  padding: 12px;
  font-size: 18px;

  :hover {
    background-color: #E4E4E4;
  }

  :focus {
    outline:0;
  }
`

const IconBox = styled.span`
  display: inline-block;
  width: 50px;
  height: 50px;
  background-image: url(${(props: { url: string; }) => props.url});
  background-size: cover;
  vertical-align: middle;
`

const ChangeNetworkButton: React.FC<ChangeNetworkButtonInterface> = ({ params, changeNetwork }) => {
  if (!params) return <></>

  const handleChangeNetwork = () => changeNetwork(params)

  return params ? (
    <NetworkButton
      className={`changeNetwork chain${parseInt(params.chainId)}`}
      onClick={handleChangeNetwork}>
      {params.iconUrls && params.iconUrls[0] && <IconBox className="icon" url={params.iconUrls[0]} />}
      {params.chainName}
    </NetworkButton>
  ) : <></>
}

export default ChangeNetworkButton
