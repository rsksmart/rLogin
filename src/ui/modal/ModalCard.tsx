// eslint-disable-next-line
import React from 'react'
import styled from 'styled-components'
import { MODAL_CARD_CLASSNAME } from '../../constants/cssSelectors'

const ModalCardWrapper = styled.div`
  position: relative;
  width: 100%;
  background-color: ${props => props.theme.modalBackground};
  border-radius: 12px;
  margin: 10px;
  padding: 0;
  max-width: 440px;
  min-width: fit-content;
  max-height: 100%;
  overflow: auto;

  @media screen and (max-width: 500px) {
    max-width: 100%;
    grid-template-columns: 1fr;
  }
`

export interface ModalCardProps {
  mainModalCard: HTMLDivElement | null | undefined
}

export const ModalCard: React.FC<ModalCardProps> = ({ mainModalCard, children }) =>
  <ModalCardWrapper
    className={MODAL_CARD_CLASSNAME}
    ref={c => (mainModalCard = c)}
  >
    {children}
  </ModalCardWrapper>
