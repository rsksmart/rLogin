import styled from 'styled-components'

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 10px;
  color: #A19191;
  font-size: 2.5em;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 300;
  &:after {
    content: '\\d7';
  }
`
