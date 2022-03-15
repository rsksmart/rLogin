import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
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
  width: ${(props: { width?: number }) => props.width ? `${props.width}%` : '33%'};
  text-align: left;
  padding: 0 5px 0 5px;
`

const AccountRow: React.FC<Interface> = ({ account, selected, onClick, balancePrefix }: Interface) => {
  const balance = new BigNumber(account.balance || 0)
  const stringBalance = balance.div(new BigNumber(10).pow(18)).toString(10)
  const niceBalance = stringBalance.substring(0, 11)

  return <DpathRowStyles onClick={onClick} selected={selected}>
    <Column width={5}>{account.index}</Column>
    <Column width={70}>{account.address}</Column>
    <Column width={25} title={`${stringBalance} ${balancePrefix}`}>
      {`${niceBalance} ${balancePrefix}`}
    </Column>
  </DpathRowStyles>
}

export default AccountRow
