// eslint-disable-next-line
import React from 'react'
import { getChainName } from '../../adapters'
import { networks } from './changeNetwork'
import { Paragraph, Header2 } from '../../ui/shared/Typography'
import NetworkUnorderedList from './NetworkUnorderedList'

interface WrongNetworkComponentInterface {
  supportedNetworks: number[] | undefined,
  isMetamask: boolean | null,
  changeNetwork: (params: any) => void
}

const WrongNetworkComponent: React.FC<WrongNetworkComponentInterface> = ({
  supportedNetworks, isMetamask, changeNetwork
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
              : <span>{getChainName(chainId)}</span>
            }
          </li>
        )}
      </NetworkUnorderedList>
    </div>
  )
}

export default WrongNetworkComponent
