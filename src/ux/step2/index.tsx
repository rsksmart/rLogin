// eslint-disable-next-line
import React, { useState } from 'react'
import { SelectiveDisclosureRequest } from './SelectiveDisclosureRequest'
import { SelectiveDisclosureResponse } from './SelectiveDisclosureResponse'
import { SDR, SD, Data } from '../../lib/sdr'
import { ErrorMessage } from '../../ui/shared/ErrorMessage'
import Loading from '../../ui/shared/Loading'
import i18next from 'i18next'

interface Step2Props {
  sdr: {
    credentials: string[]
    claims: string[]
  }
  fetchSelectiveDisclosureRequest: () => Promise<Data>
  backendUrl: string
  onConfirm: (data: SD) => void
}

const SelectiveDisclosure = ({ sdr, backendUrl, fetchSelectiveDisclosureRequest, onConfirm }: Step2Props) => {
  const [sdrConfirmed, setSdrConfirmed] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState({
    credentials: {},
    claims: {}
  })

  const onSdrConfirm = () => {
    setError(null)
    setIsLoading(true)
    fetchSelectiveDisclosureRequest().then(data => {
      setData(data)
      setSdrConfirmed(true)
    })
      .catch((error: any) => setError(error.message ? error.message : error))
      .finally(() => setIsLoading(false))
  }

  if (isLoading) {
    return <Loading text={i18next.t('Connecting to the DataVault')} />
  }

  return <>
    {!sdrConfirmed
      ? <SelectiveDisclosureRequest sdr={sdr} backendUrl={backendUrl} onConfirm={onSdrConfirm} />
      : <SelectiveDisclosureResponse data={data} backendUrl={backendUrl} onConfirm={onConfirm} />}

    {error && <ErrorMessage title={i18next.t('DataVault Error')} description={error} />}
  </>
}

export { SelectiveDisclosure, SDR, SD, Data }
