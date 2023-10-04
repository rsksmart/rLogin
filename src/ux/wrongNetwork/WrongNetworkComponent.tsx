import React from 'react'
import { getChainName } from '../../adapters'
import { AddEthereumChainParameter, networks as hardcodedNetworks } from './changeNetwork'
import { Paragraph, Header2, Header3 } from '../../ui/shared/Typography'
import NetworkUnorderedList from './NetworkUnorderedList'
import ChangeNetworkButton from './ChangeNetworkButton'
import OtherNetworkSpan from './OtherNetworkSpan'

interface WrongNetworkComponentInterface {
  supportedNetworks: number[] | undefined,
  chainId: number | undefined,
  isMetamask: boolean | null,
  isWrongNetwork: boolean,
  changeNetwork: (params: AddEthereumChainParameter) => void,
  ethereumChains?: Map<number, AddEthereumChainParameter>
}

const WrongNetworkComponent: React.FC<WrongNetworkComponentInterface> = ({
  supportedNetworks, isMetamask, isWrongNetwork, chainId, changeNetwork, ethereumChains
}) => {
  if (!supportedNetworks) {
    return <></>
  }
  const networks = ethereumChains ?? hardcodedNetworks
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
      {isWrongNetwork && <Paragraph>
        {`You are connected to an incorrect network with ${isMetamask ? 'Metamask' : 'your wallet'}. `}
        {'Please change your wallet to '}
        {supportedNetworks.length === 1
          ? <>the following network:</>
          : <>one of the following networks:</>
        }
      </Paragraph>}
      {!isWrongNetwork && chainId && <Paragraph>
        Current network: {getChainName(chainId)}
      </Paragraph>}

      {quickConnect.length !== 0 && (
        <>
          <Header3>Automatically connect Metamask to</Header3>
          <NetworkUnorderedList className="automatic">
            {quickConnect.filter(cid => cid !== chainId).map((cid: number) => (
              <li key={cid}><ChangeNetworkButton params={networks.get(cid)} changeNetwork={handleChangeNetwork} /></li>))}
          </NetworkUnorderedList>
        </>
      )}

      {manualConnect.length !== 0 && (
        <>
          <Header3>
            Available networks to be selected from
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
