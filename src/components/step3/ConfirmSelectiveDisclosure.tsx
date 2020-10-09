import React from 'react'

interface ConfirmSelectiveDisclosureProps {
  sdr: any
}

export function ConfirmSelectiveDisclosure({ sdr }: ConfirmSelectiveDisclosureProps) {
  return (
    <p>Selective disclosure request: {sdr && sdr.toString()}</p>
  )
}
