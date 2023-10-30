// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import { Trans } from 'react-i18next'

import { Header2, Header3, Paragraph, SmallSpan } from '../../ui/shared/Typography'
import { Button } from '../../ui/shared/Button'
import Select from '../../ui/shared/SelectDropdown'
import { getChainName } from '../../adapters'
import { NetworkParams, NetworkParamsAllOptions } from '../../lib/networkOptionsTypes'
import Checkbox from '../../ui/shared/Checkbox'
import { getDPathByChainId } from '@rsksmart/rlogin-dpath'
import { AddEthereumChainParameter } from '../wrongNetwork/changeNetwork'

interface Interface {
  rpcUrls?: {[key: string]: string}
  networkParamsOptions?: NetworkParamsAllOptions
  providerName?: string,
  chooseNetwork: (network: { chainId: number, rpcUrl?: string, networkParams?:NetworkParams, dPath?: string }) => void,
  ethereumChains?: Map<number, AddEthereumChainParameter>
}

const ChooseNetworkComponent: React.FC<Interface> = ({
  rpcUrls,
  networkParamsOptions,
  providerName,
  chooseNetwork,
  ethereumChains
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

  const rpcUrlsArray = Object.keys(rpcUrls)

  return (
    <div>
      {rpcUrlsArray.length > 1
        ? (
          <>
            <Header2><Trans>Choose Network</Trans></Header2>
            <Paragraph className="chainSelect">
              <Select disabled={isLoading} value={selectedChainId} onChange={evt => setSelectedChainId(evt.target.value)}>
                {rpcUrlsArray.map((chainId: string) =>
                  <option key={chainId} value={chainId}>{ethereumChains ? (ethereumChains.get(+chainId)?.chainName ?? '') : getChainName(parseInt(chainId))}</option>
                )}
              </Select>
            </Paragraph>
          </>
        )
        : (
          <>
            <Header2><Trans>Connect to:</Trans></Header2>
            <Header3>{ethereumChains ? (ethereumChains.values().next().value?.chainName ?? '') : getChainName(parseInt(rpcUrlsArray[0]))}</Header3>
          </>
        )
      }
      {showMigrationMessage && (
        <div style={{ display: 'flex' }}>
          <label className="checkbox-label">
            <Checkbox checked={useEthereumDpath} onChange={toggleCheckBox} />
            {' '}
            <SmallSpan>
              <Trans>
                Use Ethereum path (check this if you used to connect with Metamask)
              </Trans>
            </SmallSpan>
          </label>
        </div>
      )}
      <p>
        <Button disabled={isLoading} onClick={handleSelect}>Choose</Button>
      </p>
    </div>
  )
}

export default ChooseNetworkComponent
