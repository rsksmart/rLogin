// eslint-disable-next-line
import React from 'react'
import { SD } from '../step2/SelectiveDisclosureResponse'
import { Header2, Paragraph } from '../../ui/shared/Typography'
import { Button } from '../../ui/shared/Button'
import { credentialToText } from '../../vc-json-schema-adapter'

interface ConfirmSelectiveDisclosureProps {
  did: string
  sd: SD
  onConfirm: () => void
}

export function ConfirmSelectiveDisclosure ({ did, sd, onConfirm }: ConfirmSelectiveDisclosureProps) {
  const data = Object.assign({}, sd.credentials, sd.claims)
  return <>
    <Header2>Use this Identity?</Header2>
    <Paragraph>{did}</Paragraph>
    {sd != null && <>
      {Object.keys(sd.claims).map(key => <Paragraph key={key}>{key}: {data[key]}</Paragraph>)}
      {Object.keys(sd.credentials).map(key => <Paragraph key={key}>{credentialToText(key, data[key])}</Paragraph>)}
    </>}
    <Button onClick={onConfirm}>Confirm Identity</Button>
  </>
}
