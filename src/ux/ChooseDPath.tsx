import React, { useState, useEffect } from 'react'
import { getDPathByChainId } from '@rsksmart/rlogin-dpath'
import { isLedger } from '../lib/hardware-wallets'
import { WideBox } from '../ui/shared/Box'
import { Button } from '../ui/shared/Button'

export const ChooseDPath = ({ dPath, setDPath, providerName, selectedChainId }: { dPath: string, setDPath: (dPpath: string) => void, providerName: string, selectedChainId: string }) => {
  const [customDpathIndex, setCustomDpathIndex] = useState(5)

  const DpathRow = ({ i }: { i: number }) => {
    const dpath = getDPathByChainId(parseInt(selectedChainId), i, isLedger(providerName))
    return <>Account {i}: {dpath} <Button variant='secondary' onClick={() => setDPath(dpath)}>use</Button><br /></>
  }

  useEffect(() => {
    setDPath(getDPathByChainId(parseInt(selectedChainId), 0, isLedger(providerName)))
  }, [selectedChainId])


  return <WideBox>
    <b>Using: <input type="text" className="final-dpath" value={dPath} onChange={e => setDPath(e.target.value)} /></b>
    <p>
      Standard base derivation path: {getDPathByChainId(parseInt(selectedChainId), 0, isLedger(providerName)).slice(0, -1)}
      <br /><br />
      <DpathRow i={0} />
      <DpathRow i={1} />
      <DpathRow i={2} />
      <DpathRow i={3} />
      <DpathRow i={4} />
      <br />
      Account <input type="number" className="dpath-custom-index" style={{ width: 40 }} value={customDpathIndex} onChange={e => setCustomDpathIndex(parseInt(e.target.value))}  /><br />
      <DpathRow i={customDpathIndex} />
    </p>
  </WideBox>
}

export const initialDPath = (selectedChainId: string, providerName: string) => getDPathByChainId(parseInt(selectedChainId), 0, isLedger(providerName)).slice(2)
