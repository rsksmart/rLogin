// eslint-disable-next-line
import React from 'react'
import { Header2, Paragraph } from '../../ui/shared/Typography'
import { Button } from '../../ui/shared/Button'

interface ConfirmSelectiveDisclosureProps {
  did: string
  sd: any
  onConfirm: () => void
}

export function ConfirmSelectiveDisclosure ({ did, sd, onConfirm }: ConfirmSelectiveDisclosureProps) {
  return <>
    <Header2>Use this Identity?</Header2>
    <Paragraph>{did}</Paragraph>
    {sd != null && <Paragraph>Selective disclosure request: {sd && sd.toString()}</Paragraph>}
    <Button onClick={onConfirm}>Confirm Identity</Button>
  </>
}
