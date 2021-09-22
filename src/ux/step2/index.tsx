// eslint-disable-next-line
import React, { useState } from 'react'
import { SelectiveDisclosureRequest } from './SelectiveDisclosureRequest'
import { SelectiveDisclosureResponse } from './SelectiveDisclosureResponse'
import { SDR, SD, Data } from '../../lib/sdr'
import { ErrorMessage } from '../../ui/shared/ErrorMessage'
import i18next from 'i18next'
import ConfirmInWallet from '../../ui/shared/ConfirmInWallet'

interface Step2Props {
  sdr: {
    credentials: string[]
    claims: string[]
  }
  fetchSelectiveDisclosureRequest: () => Promise<Data>
  backendUrl: string
  onConfirm: (data: SD) => void
  providerName?: string
}

const SelectiveDisclosure = ({ sdr, backendUrl, fetchSelectiveDisclosureRequest, onConfirm, providerName }: Step2Props) => {
  const [sdrConfirmed, setSdrConfirmed] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loadingReason, setLoadingReason] = useState<string | null>(null)
  const [data, setData] = useState({
    credentials: {},
    claims: {}
  })

  const onSdrConfirm = () => {
    setError(null)

    const loadingText = providerName === 'MetaMask'
      ? 'Connecting to the DataVault, you will first need to sign two messages to connect. Then you will need to decrypt each piece of content.'
      : 'Connecting to the DataVault, you will need to sign two messages to connect and one to retrieve your data.'

    setLoadingReason(loadingText)

    fetchSelectiveDisclosureRequest().then(data => {
      setData(data)
      setSdrConfirmed(true)
    })
      .catch((error: any) => setError(error.message ? error.message : error))
      .finally(() => setLoadingReason(null))
  }

  if (loadingReason) {
    return <ConfirmInWallet providerName={providerName} />
  }

  return <>
    {!sdrConfirmed
      ? <SelectiveDisclosureRequest sdr={sdr} backendUrl={backendUrl} onConfirm={onSdrConfirm} />
      : <SelectiveDisclosureResponse data={data} requestedData={sdr} backendUrl={backendUrl} onConfirm={onConfirm} onRetry={onSdrConfirm}/>}

    {error && <ErrorMessage title={i18next.t('DataVault Error')} description={error} />}
  </>
}

export { SelectiveDisclosure, SDR, SD, Data }
