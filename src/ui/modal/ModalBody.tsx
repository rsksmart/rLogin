import styled from 'styled-components'

export const ModalBody = styled.div<{ big: boolean }>`
  padding: 10px 24px;
  max-width: ${({ big }) => big ? '840px' : '440px'};
`
