import React from 'react'

interface ConfirmSelectiveDisclosureProps {
  did: string
  sd: any
  onConfirm: () => void
}

export function ConfirmSelectiveDisclosure({ did, sd, onConfirm }: ConfirmSelectiveDisclosureProps) {
  return <>
    <p>{did}</p>
    {sd != null && <p>Selective disclosure request: {sd && sd.toString()}</p>}
    <button onClick={onConfirm}>confirm</button>
  </>
}
