// eslint-disable-next-line
import React, { useState } from 'react'
import { Button } from '../../ui/shared/Button'
import { Paragraph, LeftBigParagraph, Header2 } from '../../ui/shared/Typography'
import { WideBox } from '../../ui/shared/Box'
import { credentialToText } from '../../vc-json-schema-adapter'
import { Data, DataField, SD, SelectiveDisclosureField } from '../../lib/sdr'
import { Trans } from 'react-i18next'

interface SelectiveDisclosureProps {
  data: Data
  requestedData: { credentials:string[], claims:string[] }
  backendUrl: string
  onConfirm: (sd: SD) => void
  onRetry: () => void
}

interface DataListProps {
  dataField: DataField
  areCredentials: boolean
  select: (key: string, value: string) => void
}

const DataList = ({ dataField, areCredentials, select }: DataListProps) => Object.keys(dataField).length ? <div>
  {Object.keys(dataField).map((key) => <React.Fragment key={key}>
    <LeftBigParagraph>{key}</LeftBigParagraph>
    <label>
      {dataField[key].map((value, i) => <React.Fragment key={i}>
        <input type="radio" name={key} style={{ float: 'left' }} onChange={(e) => {
          if (e.target.value) select(key, value)
        }} />
        <Paragraph>
          {areCredentials ? credentialToText(key, value) : value}
          {areCredentials && <><br/>{' (Verifiable Credential)'}</>}
        </Paragraph>
      </React.Fragment>)}
    </label>
  </React.Fragment>)}
</div> : <></>

const SelectiveDisclosureResponse = ({ data: { credentials, claims }, requestedData, backendUrl, onConfirm, onRetry }: SelectiveDisclosureProps) => {
  const vaultUrl = 'https://identity.rifos.org'
  const [selectedCredentials, setSelectedCredentials] = useState({})
  const [selectedClaims, setSelectedClaims] = useState({})

  const selectField = (key: string, value: string, field: SelectiveDisclosureField, setField: (field: SelectiveDisclosureField) => void) => {
    const selectedField: SelectiveDisclosureField = {}
    selectedField[key] = value
    setField(Object.assign({}, field, selectedField))
  }

  const selectCredentials = (key: string, value: string) => selectField(key, value, selectedCredentials, setSelectedCredentials)
  const selectClaims = (key: string, value: string) => selectField(key, value, selectedClaims, setSelectedClaims)

  const confirmDialog = <>
    <Header2><Trans>Select information to share</Trans></Header2>
    <Paragraph><Trans>Sharing your information is optional. It will only be shared with</Trans>:</Paragraph>
    <Paragraph><span style={{ wordBreak: 'break-all' }}>{backendUrl}</span></Paragraph>
    <WideBox>
      <DataList dataField={claims} select={selectClaims} areCredentials={false} />
      <DataList dataField={credentials} select={selectCredentials} areCredentials={true} />
    </WideBox>
    <Button onClick={() => onConfirm({
      credentials: selectedCredentials,
      claims: selectedClaims
    })}><Trans>Confirm</Trans></Button>
  </>

  const retryDialog = <>
    <Header2><Trans>Select information to share</Trans></Header2>
    <Paragraph><Trans>There is no credentials associated with this account.</Trans></Paragraph>
    <Paragraph><a href={vaultUrl} target="_new"><Trans>Please configure your credentials in the identity manager.</Trans></a></Paragraph>
    <Button onClick={() => onRetry()}><Trans>Retry</Trans></Button>
  </>

  const hasCredentials = requestedData.credentials.length === 0 || requestedData.credentials.some((credentialName:string) => credentials[credentialName].length > 0)
  const hasClaims = requestedData.claims.length === 0 || requestedData.claims.some((claimName:string) => claims[claimName].length > 0)

  return hasCredentials && hasClaims ? confirmDialog : retryDialog
}

export { DataList, SelectiveDisclosureResponse }
