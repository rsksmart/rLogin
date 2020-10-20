// eslint-disable-next-line
import React from 'react'
import { ThemeColors, IProviderUserOptions } from 'web3modal'
import { MODAL_HITBOX_CLASSNAME, MODAL_LIGHTBOX_CLASSNAME } from '../../constants/cssSelectors'
import { ModalLightbox } from './ModalLightbox'
import { ModalContainer } from './ModalContainer'
import { ModalHitbox } from './ModalHitbox'
import { ModalCard } from './ModalCard'

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
      <ModalCard show={show} themeColors={themeColors} userOptions={userOptions} mainModalCard={mainModalCard}>
        <h2>choose your wallet</h2>
        {children}
        <p>powered by rif</p>
      </ModalCard>
    </ModalContainer>
  </ModalLightbox>
)
