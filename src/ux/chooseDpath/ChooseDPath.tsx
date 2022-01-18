import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getDPathByChainId } from '@rsksmart/rlogin-dpath'
import { isLedger } from '../../lib/hardware-wallets'
import { WideBox } from '../../ui/shared/Box'
import { Paragraph } from '../../ui/shared/Typography'
import LoadingComponent from '../../ui/shared/Loading'
import { Button } from '../../ui/shared/Button'
import AccountRow from './AccountRow'

export interface AccountInterface {
  dPath: string,
  address: string
  balance?: string
}

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

interface Interface {
  provider: any // RLoginEIP1193Provider
  selectPath: (address: string) => void
  handleError: (error: any) => void
}

export const ChooseDPathComponent: React.FC<Interface> = ({
  provider,
  selectPath,
  handleError
}) => {
  const [allAccounts, setAllAccounts] = useState<AccountInterface[]>([])
  const [selectedAccount, setSelectedAccount] = useState<string>(provider.path)

  useEffect(() => {
    setSelectedAccount(provider.dpath)
    const accountIds = [0, 1, 2, 3, 4]
    provider.getAddresses(accountIds)
      .then((accounts: AccountInterface[]) => {
        const balanceRequests = accountIds.map((id) =>
          provider.request({ method: 'eth_getBalance', params: [accounts[id].address, 'latest'] }))

        // get the balances
        Promise.all(balanceRequests)
          .then((balances: string[]) =>
            setAllAccounts(
              // add balances to the account objects
              accountIds.map((id: number) => (
                { ...accounts[id], balance: balances[id] }
              )))
          )
      })
      .catch(handleError)
  }, [provider])

  const handleSelectAccount = () => provider.chooseAccount(selectedAccount)
    .then(() => selectPath(provider.selectedAddress))
    .catch(handleError)

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
      <AccountRow
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
