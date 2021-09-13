// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import { Header2 } from '../../ui/shared/Typography'
import { Button } from '../../ui/shared/Button'
import Select from '../../ui/shared/SelectDropdown'

interface Interface {
  rpcUrls?: {[key: string]: string}
  chooseNetwork: (chainId: number, url: string) => void
}

const ChooseNetworkComponent: React.FC<Interface> = ({
  rpcUrls,
  chooseNetwork
}) => {
  if (!rpcUrls) {
    return <></>
  }
  const [selectedChainId, setSelectedChainId] = useState<string>(Object.keys(rpcUrls)[0])

  const handleSelect = () =>
    chooseNetwork(parseInt(selectedChainId), rpcUrls[selectedChainId])

  return (
    <div>
      <Header2>Choose Network</Header2>
      <p>
        <Select value={selectedChainId} onChange={evt => setSelectedChainId(evt.target.value)}>
          {Object.keys(rpcUrls).map((chainId: string) =>
            <option key={chainId} value={chainId}>{`Network ${chainId}`}</option>
          )}
        </Select>
      </p>
      <p>
        <Button onClick={handleSelect}>Choose</Button>
      </p>
    </div>
  )
}

export default ChooseNetworkComponent
