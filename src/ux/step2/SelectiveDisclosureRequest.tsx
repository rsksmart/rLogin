// eslint-disable-next-line
import React from 'react'
import { Button } from '../../ui/shared/Button'
import { Paragraph, LeftBigParagraph, Header2 } from '../../ui/shared/Typography'
import { NarrowBox } from '../../ui/shared/Box'
import { SDR } from '../../lib/sdr'
import { Trans } from 'react-i18next'

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
  <Header2><Trans>Would you like to give us access to info in your data vault?</Trans></Header2>
  <Paragraph><Trans>Get the information from your Data Vault that you want to share with the following service</Trans>:</Paragraph>
  <Paragraph><span style={{ wordBreak: 'break-all' }}>{backendUrl}</span></Paragraph>
  <NarrowBox>
    <RequestsList requests={claims} />
    <RequestsList requests={credentials} />
  </NarrowBox>
  <Button onClick={onConfirm}><Trans>Access Data Vault</Trans></Button>
</>

export { RequestsList, SelectiveDisclosureRequest }
