import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getDPathByChainId } from '@rsksmart/rlogin-dpath'
import { isLedger } from '../lib/hardware-wallets'
import { WideBox } from '../ui/shared/Box'
import { Paragraph } from '../ui/shared/Typography'

interface DpathRowInterface {
  i: number,
  dpath: string,
  onClick: () => void,
  selected: boolean
}

const DpathRowStyles = styled.button<{ selected: boolean }>`
  background: ${(props) => props.selected ? props.theme.overlay : props.theme.primaryText};
  border: none;
  border-radius: 5px;
  padding: 5px;
  font-weight: 400 !important;
  font-size: 12px;
  color: ${(props) => props.selected ? props.theme.primaryText : props.theme.p};
  width: 100%;
  cursor: pointer
`

const DPathInput = styled.input`
  border: none;
  border-bottom: ${(props) => `1px solid ${props.theme.p}`};
  color: ${props => props.theme.p};
  padding: 5px;
  margin-left: 10px;
  &:focus {
    outline: none;
}
`

const DpathRow = ({ i, dpath, selected, onClick }: DpathRowInterface) =>
  <DpathRowStyles onClick={onClick} selected={selected}>
    Account {i} : {dpath}
  </DpathRowStyles>

export const ChooseDPath = ({ dPath, setDPath, providerName, selectedChainId }: { dPath: string, setDPath: (dPpath: string) => void, providerName: string, selectedChainId: string }) => {
  const [customDpathIndex, setCustomDpathIndex] = useState(5)
  const customDpathPath = getDPathByChainId(parseInt(selectedChainId), customDpathIndex || 0, isLedger(providerName))

  useEffect(() => {
    setDPath(getDPathByChainId(parseInt(selectedChainId), 0, isLedger(providerName)))
  }, [selectedChainId])

  const handleCustomChange = (e: any) => {
    const customPath = parseInt(e.target.value)
    setCustomDpathIndex(customPath)
    customPath !== 0 && setDPath(getDPathByChainId(customPath, 0, isLedger(providerName)))
  }

  return <WideBox>
    <Paragraph>Using:
      <DPathInput
        type="text"
        className="final-dpath"
        value={dPath}
        onChange={e => setDPath(e.target.value)}
      />
    </Paragraph>

    <Paragraph>
      Standard base derivation path: {getDPathByChainId(parseInt(selectedChainId), 0, isLedger(providerName)).slice(0, -1)}
    </Paragraph>
    {Array.from({ length: 4 }, (_, i) => {
      const dpath = getDPathByChainId(parseInt(selectedChainId), i, isLedger(providerName))
      return <DpathRow
        key={i}
        i={i}
        dpath={dpath}
        onClick={() => setDPath(dpath)}
        selected={dpath === dPath}
      />
    })}

    <Paragraph>
      Custom Account:
      <DPathInput
        type="number"
        className="dpath-custom-index"
        value={customDpathIndex}
        onChange={handleCustomChange}
      />
      <DpathRow
        i={customDpathIndex || 0}
        dpath={customDpathPath}
        onClick={() => setDPath(customDpathPath)}
        selected={customDpathPath === dPath}
      />
    </Paragraph>
  </WideBox>
}

export const initialDPath = (selectedChainId: string, providerName: string) => getDPathByChainId(parseInt(selectedChainId), 0, isLedger(providerName)).slice(2)
