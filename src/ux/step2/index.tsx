// eslint-disable-next-line
import React, { useState } from 'react'
import { SelectiveDisclosureRequest } from './SelectiveDisclosureRequest'
import { SelectiveDisclosureResponse, SD, Data } from './SelectiveDisclosureResponse'
import { SDR } from '../../lib/sdr'

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
  const [data, setData] = useState({
    credentials: {},
    claims: {}
  })

  const onSdrConfirm = () => {
    fetchSelectiveDisclosureRequest().then(data => {
      setData(data)
      setSdrConfirmed(true)
    })
  }

  return <>
    {!sdrConfirmed
      ? <SelectiveDisclosureRequest sdr={sdr} backendUrl={backendUrl} onConfirm={onSdrConfirm} />
      : <SelectiveDisclosureResponse data={data} backendUrl={backendUrl} onConfirm={onConfirm} />}
  </>
}

export { SelectiveDisclosure, SDR, SD, Data }
