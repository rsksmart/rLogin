// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import { Trans } from 'react-i18next'

import { Header2, SmallSpan } from '../../ui/shared/Typography'
import { Button } from '../../ui/shared/Button'
import Select from '../../ui/shared/SelectDropdown'
import { getChainName } from '../../adapters'
import { NetworkParams, NetworkParamsAllOptions } from '../../lib/networkOptionsTypes'
import { isHardwareWalletProvider } from '../../lib/hardware-wallets'
import Checkbox from '../../ui/shared/Checkbox'

interface Interface {
  rpcUrls?: {[key: string]: string}
  networkParamsOptions?: NetworkParamsAllOptions
  chooseNetwork: (network: { chainId: number, rpcUrl?: string, networkParams?:NetworkParams }, configureDPath: boolean) => void,
  providerName: string
}

const ChooseNetworkComponent: React.FC<Interface> = ({
  rpcUrls,
  networkParamsOptions,
  chooseNetwork,
  providerName
}) => {
  if (!rpcUrls) {
    return <></>
  }
  const [selectedChainId, setSelectedChainId] = useState<string>(Object.keys(rpcUrls)[0])
  const [dpathEnabled, setDpathEnabled] = useState(false)

  const handleSelect = () =>
    chooseNetwork({ chainId: parseInt(selectedChainId), rpcUrl: rpcUrls[selectedChainId], networkParams: (networkParamsOptions && networkParamsOptions[selectedChainId]) }, dpathEnabled)

  return (
    <div>
      <Header2><Trans>Choose Network</Trans></Header2>
      <p>
        <Select value={selectedChainId} onChange={evt => setSelectedChainId(evt.target.value)}>
          {Object.keys(rpcUrls).map((chainId: string) =>
            <option key={chainId} value={chainId}>{getChainName(parseInt(chainId))}</option>
          )}
        </Select>
      </p>
      {isHardwareWalletProvider(providerName) && <>
        <label>
          <Checkbox checked={dpathEnabled} onChange={() => setDpathEnabled(!dpathEnabled)} />
          <SmallSpan><Trans>Change derivation path</Trans></SmallSpan>
        </label>
      </>
      }
      <p>
        <Button onClick={handleSelect}>Choose</Button>
      </p>
    </div>
  )
}

export default ChooseNetworkComponent
