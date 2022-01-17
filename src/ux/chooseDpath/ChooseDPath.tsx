import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getDPathByChainId } from '@rsksmart/rlogin-dpath'
import { isLedger } from '../../lib/hardware-wallets'
import { WideBox } from '../../ui/shared/Box'
import { Paragraph } from '../../ui/shared/Typography'
import LoadingComponent from '../../ui/shared/Loading'
import { shortAddress } from '../confirmInformation/ConfirmInformation'
import { Button } from '../../ui/shared/Button'

interface AccountInterface {
  dPath: string,
  address: string
}

interface DpathRowInterface {
  account: AccountInterface
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

const DpathRow = ({ account, selected, onClick }: DpathRowInterface) =>
  <DpathRowStyles onClick={onClick} selected={selected}>
    {account.dPath} : {shortAddress(account.address)}
  </DpathRowStyles>

interface Interface {
  provider: any // RLoginEIP1193Provider
  selectPath: (address: string) => void
}

export const ChooseDPathComponent: React.FC<Interface> = ({
  provider,
  selectPath
}) => {
  const [allAccounts, setAllAccounts] = useState<AccountInterface[]>([])
  const [selectedAccount, setSelectedAccount] = useState<string>(provider.path)

  useEffect(() => {
    setSelectedAccount(provider.dpath)
    provider.getAddresses([1, 2, 3, 4])
      .then((result: AccountInterface[]) =>
        setAllAccounts([
          {
            dPath: provider.dpath,
            address: provider.selectedAddress
          },
          ...result
        ]))
  }, [provider])

  const handleSelectAccount = () => {
    const account = allAccounts.filter((account: AccountInterface) => account.dPath === selectedAccount)

    if (account[0].address) {
      return provider.chooseAccount(selectedAccount)
        .then(() => selectPath(provider.selectedAddress))
    }

    console.log('no address, we need to find it ;-)')
    // handle custom dpath, need to get the address...
  }

  if (allAccounts.length === 0) {
    return <LoadingComponent text="retrieving addresses" />
  }

  return <WideBox>
    <Paragraph>Using:
      <DPathInput
        type="text"
        className="final-dpath"
        value={selectedAccount}
        onChange={e => setSelectedAccount(e.target.value)}
      />
    </Paragraph>

    <Paragraph>
      Standard base derivation path: {provider.path}
    </Paragraph>

    {allAccounts.map((account: AccountInterface) =>
      <DpathRow
        key={account.dPath}
        account={account}
        selected={account.dPath === selectedAccount}
        onClick={() => setSelectedAccount(account.dPath)}
      />
    )}
    <Button onClick={handleSelectAccount}>Select</Button>
  </WideBox>
}

export const initialDPath = (selectedChainId: string, providerName: string) => getDPathByChainId(parseInt(selectedChainId), 0, isLedger(providerName)).slice(2)
