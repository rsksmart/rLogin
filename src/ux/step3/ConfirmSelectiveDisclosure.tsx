// eslint-disable-next-line
import React, { useState } from 'react'
import { SD } from '../../lib/sdr'
import { Header2, Paragraph } from '../../ui/shared/Typography'
import { Button } from '../../ui/shared/Button'
import { credentialToText } from '../../vc-json-schema-adapter'
import Loading from '../../ui/shared/Loading'
import { Trans } from 'react-i18next'
import i18next from 'i18next'
interface ConfirmSelectiveDisclosureProps {
  did: string
  sd: SD
  onConfirm: () => void
}

export function ConfirmSelectiveDisclosure ({ did, sd, onConfirm }: ConfirmSelectiveDisclosureProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const data = sd ? Object.assign({}, sd.credentials, sd.claims) : {}

  const handleSubmit = () => {
    setIsLoading(true)
    onConfirm()
  }

  return !isLoading
    ? <>
      <Header2><Trans>Use this Identity?</Trans></Header2>
      <Paragraph>{did}</Paragraph>
      {sd != null && <>
        {Object.keys(sd.claims).map(key => <Paragraph key={key}>{key}: {data[key]}</Paragraph>)}
        {Object.keys(sd.credentials).map(key => <Paragraph key={key}>{credentialToText(key, data[key])}</Paragraph>)}
      </>}
      <Button onClick={handleSubmit} disabled={isLoading}><Trans>Confirm Identity</Trans></Button>
    </>
    : <Loading text={i18next.t('Confirming Identity')} size={10} />
}
