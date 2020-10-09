import React from 'react'
import { ModalCard, ModalCardProps } from '../ModalCard'

interface ConfirmSelectiveDisclosureProps extends ModalCardProps {
  sdr: any
}

export function ConfirmSelectiveDisclosure({ sdr, ...modalCardProps }: ConfirmSelectiveDisclosureProps) {
  return (
    <ModalCard {...modalCardProps}>
      <p>Selective disclosure request: {sdr && sdr.toString()}</p>
    </ModalCard>
  )
}
