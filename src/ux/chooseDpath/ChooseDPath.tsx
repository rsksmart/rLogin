import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Header2, Paragraph } from '../../ui/shared/Typography'
import LoadingComponent from '../../ui/shared/Loading'
import { Button } from '../../ui/shared/Button'
import AccountRow from './AccountRow'
import { Trans } from 'react-i18next'
import { getGasNameFromChain } from '../../adapters'

export interface AccountInterface {
  index: number
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

const AccountWrapper = styled.div`
  margin-bottom: 10px;
  margin-left: -10px;
  margin-right: -10px;
`

const Row = styled.div`
  display: flex;
  font-size: 14px;
  color: ${props => props.theme.h3};
  border-bottom: ${(props) => `2px solid ${props.theme.p}`};
  padding-bottom: 5px;
`

export const Column = styled.div`
  width: ${(props: { width?: number, textAlign?: string }) => props.width ? `${props.width}%` : '33%'};
  flex-direction: column;
  align-items: flex-start;
  text-align: ${(props) => props.textAlign ? `${props.textAlign}` : 'center'};
  padding: 0 5px 0 5px;
`

interface Interface {
  provider: any
  selectPath: (address: string) => void
  handleError: (error: any) => void
}

export const ChooseDPathComponent: React.FC<Interface> = ({
  provider,
  selectPath,
  handleError
}) => {
  const [allAccounts, setAllAccounts] = useState<AccountInterface[]>([])
  const [viewableAccounts, setViewAbleAccounts] = useState<AccountInterface[]>([])
  const [viewableIndex, setViewableIndex] = useState<number>(0)

  const [selectedAccount, setSelectedAccount] = useState<string>(provider.path)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setSelectedAccount(provider.dpath)
    getAccountsAndBalance(0)
  }, [provider])

  const getAccountsAndBalance = (startingIndex: number) => {
    setIsLoading(true)
    setViewAbleAccounts([])

    // if the provider's path is set to Ethereum, use that, else use the ChainIds:
    const baseDpath = (provider.path || provider.dpath).split('/').slice(0, -1).join('/')
    const nextPaths = Array.from({ length: 5 }, (_, i) => i + startingIndex).map(index => `${baseDpath}/${index}`)

    provider.getAddresses(nextPaths)
      .then((accounts: AccountInterface[]) => {
        const balanceRequests = accounts.map((account) =>
          provider.request({
            method: 'eth_getBalance',
            params: [account.address.toLowerCase(), 'latest']
          }))

        setSelectedAccount(accounts[0].dPath)

        // get the balances
        Promise.all(balanceRequests)
          .then((balances: string[]) => {
            const newAccounts = accounts.map((account, index) => (
              { ...account, balance: balances[index], index: index + startingIndex }
            ))

            setAllAccounts([...allAccounts, ...newAccounts])
            setViewAbleAccounts(newAccounts)
            setIsLoading(false)
          })
      })
      .catch(handleError)
  }

  const handleSelectAccount = () => {
    setIsLoading(true)
    provider.chooseAccount(selectedAccount)
      .then(() => selectPath(provider.selectedAddress))
      .catch(handleError)
  }

  const showMoreAccounts = (newIndex: number) => {
    setViewableIndex(newIndex)

    const newAccounts = allAccounts.filter((account) =>
      account.index >= newIndex && account.index < newIndex + 5)

    if (newAccounts.length === 0) {
      return getAccountsAndBalance(newIndex)
    }

    setSelectedAccount(newAccounts[0].dPath)
    setViewAbleAccounts(newAccounts)
  }

  if (viewableAccounts.length === 0) {
    return <LoadingComponent text="retrieving addresses and balances" />
  }

  return <>
    <Header2><Trans>Select an account</Trans></Header2>

    <AccountWrapper>
      <Row>
        <Column width={5}><Trans>#</Trans></Column>
        <Column width={70}><Trans>Address</Trans></Column>
        <Column textAlign={'left'} width={25}><Trans>Balance</Trans></Column>
      </Row>

      {viewableAccounts.map((account: AccountInterface) =>
        <AccountRow
          key={account.index}
          account={account}
          selected={account.dPath === selectedAccount}
          onClick={() => setSelectedAccount(account.dPath)}
          balancePrefix={getGasNameFromChain(provider.chainId)}
        />)
      }
    </AccountWrapper>

    <Button
      onClick={() => showMoreAccounts(viewableIndex - 5)}
      variant="secondary"
      disabled={isLoading || viewableIndex === 0}
    >&lt;</Button>

    <Button
      onClick={() => showMoreAccounts(viewableIndex + 5)}
      variant="secondary"
      disabled={isLoading}
    >&gt;</Button>

    <Paragraph>
      <Trans>Or use the textbox to choose a specific path:</Trans>
      <DPathInput
        type="text"
        className="final-dpath"
        value={selectedAccount}
        onChange={e => setSelectedAccount(e.target.value)}
      />
    </Paragraph>

    <Button onClick={handleSelectAccount} disabled={isLoading}><Trans>Confirm</Trans></Button>
  </>
}
