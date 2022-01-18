import React from 'react'
import styled from 'styled-components'
import { shortAddress } from '../confirmInformation/ConfirmInformation'
import { AccountInterface } from './ChooseDPath'

interface Interface {
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

const AccountRow: React.FC<Interface> = ({ account, selected, onClick }: Interface) =>
  <DpathRowStyles onClick={onClick} selected={selected}>
    {account.dPath}
    :
    {shortAddress(account.address)}
    :
    {account.balance}
  </DpathRowStyles>

export default AccountRow
