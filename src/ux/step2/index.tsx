// eslint-disable-next-line
import React from 'react'
import { SelectiveDisclosureRequest } from './SelectiveDisclosureRequest'

interface Step2Props {
  sdr: {
    credentials: string[]
    claims: string[]
  },
  backendUrl: string
}

const SelectiveDisclosure = ({ sdr, backendUrl }: Step2Props) => <>
  <SelectiveDisclosureRequest sdr={sdr} backendUrl={backendUrl} />
</>

export { SelectiveDisclosure }
