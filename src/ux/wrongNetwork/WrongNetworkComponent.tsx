// eslint-disable-next-line
import React from 'react'
import styled from 'styled-components'
import { getChainName } from '../../adapters'
import { networks } from './changeNetwork'
import { Paragraph, Header2 } from '../../ui/shared/Typography'

interface WrongNetworkComponentInterface {
  currentNetwork: number | undefined,
  supportedNetworks: number[] | undefined,
  isMetamask: boolean | null,
  changeNetwork: (params: any) => void
}

const NetworkUnorderedList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  li {
    padding: 5px 0;
    font-size: 13px;

    button {
      display: block;
      width: 100%;
      cursor: pointer;
      border: none;
      background-color: #F2F2F2;
      border-radius: 12px;
      padding: 15px;
    }

    button:hover {
      background-color: #E4E4E4;
    }

    button:focus {
      outline:0;
    }
  }
`

const WrongNetworkComponent: React.FC<WrongNetworkComponentInterface> = ({
  currentNetwork, supportedNetworks, isMetamask, changeNetwork
}) => {
  if (!supportedNetworks) {
    return <></>
  }

  return (
    <div>
      <Header2>Incorrect Network</Header2>
      <Paragraph>
        {'Please change your wallet to '}
        {supportedNetworks.length === 1
          ? <>the following network:</>
          : <>one of the following networks:</>
        }
      </Paragraph>

      <NetworkUnorderedList>
        {supportedNetworks.map((chainId: number) =>
          <li key={chainId}>
            {networks.get(chainId) && isMetamask
              ? <button className="changeNetwork" onClick={() => changeNetwork(networks.get(chainId))}>{getChainName(chainId)}</button>
              : getChainName(chainId)
            }
          </li>
        )}
      </NetworkUnorderedList>
    </div>
  )
}

export default WrongNetworkComponent
