// eslint-disable-next-line
import React from 'react'
import { getChainName } from '../../adapters'
import { AddEthereumChainParameter, networks } from './changeNetwork'
import { Paragraph, Header2, Header3 } from '../../ui/shared/Typography'
import NetworkUnorderedList from './NetworkUnorderedList'
import ChangeNetworkButton from './ChangeNetworkButton'
import OtherNetworkSpan from './OtherNetworkSpan'

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

  const quickConnect: number[] = []
  let manualConnect: number[] = []

  if (!isMetamask) {
    manualConnect = supportedNetworks
  } else {
    supportedNetworks.map((chainId: number) => {
      networks.get(chainId) ? quickConnect.push(chainId) : manualConnect.push(chainId)
    })
  }

  return (
    <div>
      <Header2>Select Network</Header2>
      <Paragraph>
        {`You are connected to an incorrect network with ${isMetamask ? 'Metamask' : 'your wallet'}. `}
        {'Please change your wallet to '}
        {supportedNetworks.length === 1
          ? <>the following network:</>
          : <>one of the following networks:</>
        }
      </Paragraph>

      {quickConnect.length !== 0 && (
        <>
          <Header3>Automatically connect Metamask to</Header3>
          <NetworkUnorderedList className="automatic">
            {quickConnect.map((chainId: number) => (
              <li key={chainId}><ChangeNetworkButton params={networks.get(chainId)} changeNetwork={handleChangeNetwork} /></li>))}
          </NetworkUnorderedList>
        </>
      )}

      {manualConnect.length !== 0 && (
        <>
          <Header3>
            Other available networks to be selected from 
            {isMetamask ? ' Metamask' : ' your wallet'}
          </Header3>
          <NetworkUnorderedList className="manual">
            {manualConnect.map((chainId: number) => (
              <li key={chainId}><OtherNetworkSpan>{getChainName(chainId)}</OtherNetworkSpan></li>))}
          </NetworkUnorderedList>
        </>
      )}
    </div>
  )
}

export default WrongNetworkComponent
