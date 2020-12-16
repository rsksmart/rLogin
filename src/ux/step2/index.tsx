// eslint-disable-next-line
import React, { useState } from 'react'
import { SelectiveDisclosureRequest, SDR } from './SelectiveDisclosureRequest'
import { SelectiveDisclosureResponse, SD, Data } from './SelectiveDisclosureResponse'
import { Header2 } from '../../ui/shared/Typography'

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
    <Header2>Would you like to give us<br />access to info in your data vault?</Header2>
    {!sdrConfirmed
      ? <SelectiveDisclosureRequest sdr={sdr} backendUrl={backendUrl} onConfirm={onSdrConfirm} />
      : <SelectiveDisclosureResponse data={data} backendUrl={backendUrl} onConfirm={onConfirm} />}
  </>
}

export { SelectiveDisclosure, SDR, SD, Data }
