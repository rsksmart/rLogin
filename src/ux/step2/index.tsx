// eslint-disable-next-line
import React, { useState } from 'react'
import { SelectiveDisclosureRequest } from './SelectiveDisclosureRequest'
import { SelectiveDisclosureResponse } from './SelectiveDisclosureResponse'
import { SDR, SD, Data } from '../../lib/sdr'
import { ErrorMessage } from '../../ui/shared/ErrorMessage'

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
  const [data, setData] = useState({
    credentials: {},
    claims: {}
  })

  const onSdrConfirm = () => {
    setError(null)
    fetchSelectiveDisclosureRequest().then(data => {
      setData(data)
      setSdrConfirmed(true)
    })
      .catch((error: string) => setError(error))
  }

  return <>
    {!sdrConfirmed
      ? <SelectiveDisclosureRequest sdr={sdr} backendUrl={backendUrl} onConfirm={onSdrConfirm} />
      : <SelectiveDisclosureResponse data={data} backendUrl={backendUrl} onConfirm={onConfirm} />}
    {error && <ErrorMessage title="Decrypt Error" description="Please log in with Metamask to decrypt your Data Vault content." />}
  </>
}

export { SelectiveDisclosure, SDR, SD, Data }
