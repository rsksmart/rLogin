// eslint-disable-next-line
import React from 'react'
import { Button } from '../../ui/shared/Button'

export interface SDR {
  credentials: string[]
  claims: string[]
}

interface SelectiveDisclosureRequestProps {
  sdr: SDR
  backendUrl: string
  onConfirm: () => void
}

const RequestsList = ({ requests, title }: { requests: string[], title: string }) => requests.length ? <>
  <p>{title}</p>
  <ul>
    {requests.map((request, i) => <li key={i}>{request}</li>)}
  </ul>
</> : <></>

const SelectiveDisclosureRequest = ({ sdr: { credentials, claims }, backendUrl, onConfirm }: SelectiveDisclosureRequestProps) => <>
  <p>Would you like to give us access to info in your data vault?</p>
  <p>Select the information you want to share with {backendUrl}</p>
  <RequestsList requests={credentials} title="Credentials" />
  <RequestsList requests={claims} title="Claims" />
  <Button onClick={onConfirm}>Access Data Vault</Button>
</>

export { RequestsList, SelectiveDisclosureRequest }
