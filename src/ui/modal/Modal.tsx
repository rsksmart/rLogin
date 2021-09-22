import React from 'react'
import { MODAL_HITBOX_CLASSNAME, MODAL_LIGHTBOX_CLASSNAME, MODAL_CLOSE_BUTTON_CLASSNAME, MODAL_HEADER_CLASSNAME, MODAL_BODY_CLASSNAME } from '../../constants/cssSelectors'
import { ModalLightbox } from './ModalLightbox'
import { ModalContainer } from './ModalContainer'
import { ModalHitbox } from './ModalHitbox'
import { ModalCard } from './ModalCard'
import { ModalCloseButton } from './ModalCloseButton'
import { ModalHeader } from './ModalHeader'
import { ModalBody } from './ModalBody'
import PoweredByComponent from './PoweredByComponent'

interface ModalProps {
  lightboxOffset: number
  show: boolean
  onClose: () => void
  setLightboxRef: (c: HTMLDivElement | null) => void
  mainModalCard: HTMLDivElement | null | undefined
  big: boolean
}

export const Modal: React.FC<ModalProps> = ({
  lightboxOffset,
  show,
  onClose,
  setLightboxRef,
  mainModalCard,
  children,
  big
}) => (
  <ModalLightbox
    className={MODAL_LIGHTBOX_CLASSNAME}
    offset={lightboxOffset}
    ref={setLightboxRef}
    show={show}
  >
    <ModalContainer show={show}>
      <ModalHitbox className={MODAL_HITBOX_CLASSNAME} onClick={onClose} />
      <ModalCard mainModalCard={mainModalCard} big={big}>
        <ModalHeader className={MODAL_HEADER_CLASSNAME}>
          <ModalCloseButton className={MODAL_CLOSE_BUTTON_CLASSNAME} onClick={onClose} />
          <PoweredByComponent />
        </ModalHeader>
        <ModalBody className={MODAL_BODY_CLASSNAME} big={big}>
          {children}
        </ModalBody>
      </ModalCard>
    </ModalContainer>
  </ModalLightbox>
)
