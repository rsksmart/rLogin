// eslint-disable-next-line
import React from 'react'
import { Button } from '../../ui/shared/Button'
import { Paragraph, LeftBigParagraph } from '../../ui/shared/Typography'
import { Box } from '../../ui/shared/Box'

export interface SDR {
  credentials: string[]
  claims: string[]
}

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
  <Paragraph>Get the information you want to share with {backendUrl} from you Data Vault</Paragraph>
  <Box>
    <RequestsList requests={claims} />
    <RequestsList requests={credentials} />
  </Box>
  <Button onClick={onConfirm}>Access Data Vault</Button>
</>

export { RequestsList, SelectiveDisclosureRequest }
