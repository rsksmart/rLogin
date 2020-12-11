// eslint-disable-next-line
import React from 'react'
import { Button } from '../../ui/shared/Button'

interface SelectiveDisclosureRequestProps {
  sdr: {
    credentials: string[]
    claims: string[]
  }
  backendUrl: string
}

const RequestsList = ({ requests, title }: { requests: string[], title: string }) => requests.length ? <>
  <p>{title}</p>
  <ul>
    {requests.map((request, i) => <li key={i}>{request}</li>)}
  </ul>
</> : <></>

const SelectiveDisclosureRequest = ({ sdr: { credentials, claims }, backendUrl }: SelectiveDisclosureRequestProps) => <>
  <p>Would you like to give us access to info in your data vault?</p>
  <p>Select the information you want to share with {backendUrl}</p>
  <RequestsList requests={credentials} title="Credentials" />
  <RequestsList requests={claims} title="Claims" />
  <Button onClick={() => {}}>Confirm</Button>
</>

export { RequestsList, SelectiveDisclosureRequest }
