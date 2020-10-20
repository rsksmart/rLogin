// eslint-disable-next-line
import React from 'react'
import { ThemeColors, IProviderUserOptions } from 'web3modal'
import { MODAL_HITBOX_CLASSNAME, MODAL_LIGHTBOX_CLASSNAME, MODAL_CLOSE_BUTTON_CLASSNAME, MODAL_HEADER_CLASSNAME } from '../../constants/cssSelectors'
import { ModalLightbox } from './ModalLightbox'
import { ModalContainer } from './ModalContainer'
import { ModalHitbox } from './ModalHitbox'
import { ModalCard } from './ModalCard'
import { ModalCloseButton } from './ModalCloseButton'
import { ModalHeader } from './ModalHeader'
import PoweredByRif from '../../images/PoweredByRif'

interface ModalProps {
  lightboxOffset: number
  lightboxOpacity: number
  show: boolean
  onClose: () => void
  setLightboxRef: (c: HTMLDivElement | null) => void
  themeColors: ThemeColors
  userOptions: IProviderUserOptions[]
  mainModalCard: HTMLDivElement | null | undefined
}

export const Modal: React.FC<ModalProps> = ({
  lightboxOffset,
  lightboxOpacity,
  show,
  onClose,
  setLightboxRef,
  themeColors,
  userOptions,
  mainModalCard,
  children
}) => (
  <ModalLightbox
    className={MODAL_LIGHTBOX_CLASSNAME}
    offset={lightboxOffset}
    opacity={lightboxOpacity}
    ref={setLightboxRef}
    show={show}
  >
    <ModalContainer show={show}>
      {/* TODO: test this component hitting outside the modal */}
      <ModalHitbox className={MODAL_HITBOX_CLASSNAME} onClick={onClose} />
      <ModalCard mainModalCard={mainModalCard}>
        <ModalHeader className={MODAL_HEADER_CLASSNAME}>
          <ModalCloseButton className={MODAL_CLOSE_BUTTON_CLASSNAME} onClick={onClose} />
          <PoweredByRif />
        </ModalHeader>
        <h2>choose your wallet</h2>
        {children}
        <p>powered by rif</p>
      </ModalCard>
    </ModalContainer>
  </ModalLightbox>
)
