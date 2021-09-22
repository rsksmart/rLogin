// eslint-disable-next-line no-use-before-define
import styled from 'styled-components'
import { typeShared } from './Typography'

const Select = styled.select`
  ${typeShared}
  padding: 10px 25px 10px 10px;
  border-radius: 5px;
  background: ${props => props.theme.modalBackground};
  color: ${props => props.theme.p};

  &:focus {
    outline: none;
  }
`

export default Select
