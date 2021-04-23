// eslint-disable-next-line
import React from 'react'
import { getChainName } from '../../adapters'
import { networks } from './changeNetwork'
import { Paragraph, Header2 } from '../../ui/shared/Typography'
import NetworkUnorderedList from './NetworkUnorderedList'
import { AddEthereumChainParameter } from '../../lib/provider'
import ChangeNetworkButton from './ChangeNetworkButton'

interface WrongNetworkComponentInterface {
  supportedNetworks: number[] | undefined,
  isMetamask: boolean | null,
  changeNetwork: (params: AddEthereumChainParameter) => void
}

const WrongNetworkComponent: React.FC<WrongNetworkComponentInterface> = ({
  supportedNetworks, isMetamask, changeNetwork
}) => {
  if (!supportedNetworks) {
    return <></>
  }

  const handleChangeNetwork = (params: AddEthereumChainParameter | undefined) =>
    params !== undefined && changeNetwork(params)

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
              ? <ChangeNetworkButton params={networks.get(chainId)} changeNetwork={handleChangeNetwork} />
              : <span className="text">{getChainName(chainId)}</span>
            }
          </li>
        )}
      </NetworkUnorderedList>
    </div>
  )
}

export default WrongNetworkComponent
