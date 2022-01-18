import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getDPathByChainId } from '@rsksmart/rlogin-dpath'
import { isLedger } from '../../lib/hardware-wallets'
import { Header2, Header3, Paragraph } from '../../ui/shared/Typography'
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

const Row = styled.div`
  display: flex;
  font-size: 14px;
  color: ${props => props.theme.h3};
  border-bottom: ${(props) => `1px solid ${props.theme.p}`};
  padding-bottom: 5px;
`

export const Column = styled.div`
  width: 33%;
  text-align: left;
  padding: 0 5px 0 10px;
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
          provider.request({
            method: 'eth_getBalance',
            params: [accounts[id].address.toLowerCase(), 'latest']
          }))

        // get the balances
        Promise.all(balanceRequests)
          .then((balances: string[]) =>
            setAllAccounts(
              // add balances to the account objects
              accountIds.map((id: number) => (
                { ...accounts[id], balance: balances[id] }
              ))))
      })
      .catch(handleError)
  }, [provider])

  const handleSelectAccount = () => provider.chooseAccount(selectedAccount)
    .then(() => selectPath(provider.selectedAddress))
    .catch(handleError)

  if (allAccounts.length === 0) {
    return <LoadingComponent text="retrieving addresses and balances" />
  }

  return <>
    <Header2>Select an account</Header2>

    <Row>
      <Column>Path</Column>
      <Column>Address</Column>
      <Column>Balance</Column>
    </Row>

    {allAccounts.map((account: AccountInterface) =>
      <AccountRow
        key={account.dPath}
        account={account}
        selected={account.dPath === selectedAccount}
        onClick={() => setSelectedAccount(account.dPath)}
      />
    )}

    <Header3>Or choose a specific path</Header3>
    <Paragraph>Current Path:
      <DPathInput
        type="text"
        className="final-dpath"
        value={selectedAccount}
        onChange={e => setSelectedAccount(e.target.value)}
      />
    </Paragraph>

    <Button onClick={handleSelectAccount}>Select</Button>
  </>
}

export const initialDPath = (selectedChainId: string, providerName: string) => getDPathByChainId(parseInt(selectedChainId), 0, isLedger(providerName)).slice(2)
