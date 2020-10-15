import React from 'react'
import styled from 'styled-components'
import { MODAL_CONTAINER_CLASSNAME } from 'web3modal'

interface ModalContainerWrapperProps {
  show: boolean;
}

interface ModalContainerProps {
  show: boolean;
}

const ModalContainerWrapper = styled.div<ModalContainerWrapperProps>`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ show }) => (show ? 1 : 0)};
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  pointer-events: ${({ show }) => (show ? 'auto' : 'none')};
`

export const ModalContainer: React.FC<ModalContainerProps> = ({ children, show }) => (
  <ModalContainerWrapper className={MODAL_CONTAINER_CLASSNAME} show={show}>
    {children}
  </ModalContainerWrapper>
)
