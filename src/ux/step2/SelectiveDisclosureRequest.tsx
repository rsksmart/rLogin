// eslint-disable-next-line
import React from 'react'
import { Button } from '../../ui/shared/Button'
import { Paragraph, LeftBigParagraph, Header2 } from '../../ui/shared/Typography'
import { NarrowBox } from '../../ui/shared/Box'
import { SDR } from '../../lib/sdr'

interface SelectiveDisclosureRequestProps {
  sdr: SDR
  backendUrl: string
  onConfirm: () => void
}

// TODO: add optional fields to fetch
const RequestsList = ({ requests }: { requests: string[] }) => requests.length ? <>
  {requests.map((request, i) => <LeftBigParagraph key={i}>{request}</LeftBigParagraph>)}
</> : <></>

const SelectiveDisclosureRequest = ({ sdr: { credentials, claims }, backendUrl, onConfirm }: SelectiveDisclosureRequestProps) => <>
  <Header2>Would you like to give us<br />access to info in your data vault?</Header2>
  <Paragraph>Get the information you want to share with <span style={{ wordBreak: 'break-all' }}>{backendUrl}</span> from you Data Vault</Paragraph>
  <NarrowBox>
    <RequestsList requests={claims} />
    <RequestsList requests={credentials} />
  </NarrowBox>
  <Button onClick={onConfirm}>Access Data Vault</Button>
</>

export { RequestsList, SelectiveDisclosureRequest }
