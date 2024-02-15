import styled from 'styled-components'

export const ModalCloseButton = styled.button`
  color: #313241;
  font-size: 1.5em;
  border: none;
  background: #F1F1F1;
  cursor: pointer;
  font-weight: 300;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  position: relative;
  &:after {
    content: '\\d7';
    position: absolute;
    top: -1px;
    right: 4.8px;
  }
`
