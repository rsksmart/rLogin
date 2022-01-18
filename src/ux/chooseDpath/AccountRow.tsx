import React from 'react'
import styled from 'styled-components'
import BN from 'bn.js'
import { shortAddress } from '../confirmInformation/ConfirmInformation'
import { AccountInterface } from './ChooseDPath'

interface Interface {
  account: AccountInterface
  onClick: () => void,
  selected: boolean
  balancePrefix?: string
}

const DpathRowStyles = styled.button<{ selected: boolean }>`
  display: flex;
  background: ${(props) => props.selected ? props.theme.overlay : props.theme.primaryText};
  border: none;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 5px;
  font-weight: 400 !important;
  font-size: 12px;
  color: ${(props) => props.selected ? props.theme.primaryText : props.theme.p};
  width: 100%;
  cursor: pointer
`

const Column = styled.div`
  width: 33%;
  text-align: left;
  padding: 0 5px;
`

const AccountRow: React.FC<Interface> = ({ account, selected, onClick, balancePrefix}: Interface) => {
  const balance = account.balance && account.balance.startsWith('0x')
    ? new BN(account.balance.substring(2), 16)
    : new BN(account.balance || 0, 16)

  // BN.js does not handle decimals
  const niceBalance = balance.toNumber() / 1000000000000000000

  return <DpathRowStyles onClick={onClick} selected={selected}>
    <Column>{account.dPath}</Column>
    <Column>{shortAddress(account.address)}</Column>
    <Column>{`${niceBalance.toString().substring(0, 10)} ${balancePrefix}`} </Column>
  </DpathRowStyles>
}

export default AccountRow
