// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import { Trans } from 'react-i18next'

import { Header2, SmallSpan } from '../../ui/shared/Typography'
import { Button } from '../../ui/shared/Button'
import Select from '../../ui/shared/SelectDropdown'
import { getChainName } from '../../adapters'
import { NetworkParams, NetworkParamsAllOptions } from '../../lib/networkOptionsTypes'
import Checkbox from '../../ui/shared/Checkbox'
import { getDPathByChainId } from '@rsksmart/rlogin-dpath'

interface Interface {
  rpcUrls?: {[key: string]: string}
  networkParamsOptions?: NetworkParamsAllOptions
  providerName?: string,
  chooseNetwork: (network: { chainId: number, rpcUrl?: string, networkParams?:NetworkParams, dPath?: string }) => void
}

const ChooseNetworkComponent: React.FC<Interface> = ({
  rpcUrls,
  networkParamsOptions,
  providerName,
  chooseNetwork
}) => {
  if (!rpcUrls) {
    return <></>
  }
  const [selectedChainId, setSelectedChainId] = useState<string>(Object.keys(rpcUrls)[0])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [useEthereumDpath, setUseEthereumDpath] = useState<boolean>(false)

  const handleSelect = () => {
    setIsLoading(true)
    chooseNetwork({
      chainId: parseInt(selectedChainId),
      rpcUrl: rpcUrls[selectedChainId],
      networkParams: (networkParamsOptions && networkParamsOptions[selectedChainId]),
      dPath: useEthereumDpath ? getDPathByChainId(1, 0) : undefined
    })
  }

  const toggleCheckBox = () => setUseEthereumDpath(!useEthereumDpath)

  const showMigrationMessage =
    (providerName === 'Ledger' || providerName === 'Trezor') &&
    selectedChainId !== '1'

  return (
    <div>
      <Header2><Trans>Choose Network</Trans></Header2>
      <p>
        <Select disabled={isLoading} value={selectedChainId} onChange={evt => setSelectedChainId(evt.target.value)}>
          {Object.keys(rpcUrls).map((chainId: string) =>
            <option key={chainId} value={chainId}>{getChainName(parseInt(chainId))}</option>
          )}
        </Select>
      </p>
      {showMigrationMessage && (
        <>
          <Checkbox checked={useEthereumDpath} onChange={toggleCheckBox} />
          {' '}
          <label onClick={toggleCheckBox} className="checkbox-label">
            <SmallSpan>
              <Trans>
              Use Ethereum path (check this if you used to connect with Metamask)
              </Trans>
            </SmallSpan>
          </label>
        </>
      )}
      <p>
        <Button disabled={isLoading} onClick={handleSelect}>Choose</Button>
      </p>
    </div>
  )
}

export default ChooseNetworkComponent
