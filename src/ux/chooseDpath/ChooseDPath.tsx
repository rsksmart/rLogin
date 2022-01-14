import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getDPathByChainId } from '@rsksmart/rlogin-dpath'
import { isLedger } from '../../lib/hardware-wallets'
import { WideBox } from '../../ui/shared/Box'
import { Paragraph } from '../../ui/shared/Typography'
import LoadingComponent from '../../ui/shared/Loading'

interface DpathRowInterface {
  path: {
    path: string,
    address: string
  }
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

const DpathRow = ({ path, selected, onClick }: DpathRowInterface) =>
  <DpathRowStyles onClick={onClick} selected={selected}>
    {path.path} : {path.address}
  </DpathRowStyles>

interface Interface {
  provider: any // RLoginEIP1193Provider
}

// export const ChooseDPath = ({ dPath, setDPath, providerName, selectedChainId }: { dPath: string, setDPath: (dPpath: string) => void, providerName: string, selectedChainId: string }) => {
export const ChooseDPathComponent: React.FC<Interface> = ({
  provider
}) => {
  const [dPath, setDPath] = useState<string>('')
  const [allPaths, setAllPaths] = useState<any[]>([])

  useEffect(() => {
    console.log('provider', provider)
    setDPath(provider.dpath)
    console.log('getting others...')
    provider.getAddresses([1, 2, 3, 4, 50]).then((result: any) => setAllPaths(result))
  }, [provider])
  // const [customDpathIndex, setCustomDpathIndex] = useState(5)
  // const customDpathPath = getDPathByChainId(parseInt(selectedChainId), customDpathIndex || 0, isLedger(providerName))
  /*
  useEffect(() => {
    setDPath(getDPathByChainId(parseInt(selectedChainId), 0, isLedger(providerName)))
  }, [selectedChainId])

  const handleCustomChange = (e: any) => {
    const customPath = parseInt(e.target.value)
    setCustomDpathIndex(customPath)
    customPath !== 0 && setDPath(getDPathByChainId(customPath, 0, isLedger(providerName)))
  }
  */
  if (allPaths.length === 0) {
    return <LoadingComponent text="retrieving addresses" />
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
      Standard base derivation path:
    </Paragraph>

    {allPaths.map((path: any) =>
      <DpathRow key={path.path} path={path} selected={false} onClick={() => console.log('click')} />
    )}
  </WideBox>
}

export const initialDPath = (selectedChainId: string, providerName: string) => getDPathByChainId(parseInt(selectedChainId), 0, isLedger(providerName)).slice(2)
