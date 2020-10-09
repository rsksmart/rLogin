import React from 'react'

interface ConfirmSelectiveDisclosureProps {
  did: string
  sd: any
}

export function ConfirmSelectiveDisclosure({ did, sd }: ConfirmSelectiveDisclosureProps) {
  return <>
    <p>{did}</p>
    {sd != null && <p>Selective disclosure request: {sd && sd.toString()}</p>}
  </>
}
