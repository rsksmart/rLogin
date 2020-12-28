// eslint-disable-next-line
import React, { useState } from 'react'
import { Button } from '../../ui/shared/Button'
import { Paragraph, LeftBigParagraph, Header2 } from '../../ui/shared/Typography'
import { WideBox } from '../../ui/shared/Box'
import { credentialToText } from '../../vc-json-schema-adapter'
import { Data, DataField, SD, SelectiveDisclosureField } from '../../lib/sdr'

interface SelectiveDisclosureProps {
  data: Data
  backendUrl: string
  onConfirm: (sd: SD) => void
}

interface DataListProps {
  dataField: DataField
  areCredentials: boolean
  select: (key: string, value: string) => void
}

const DataList = ({ dataField, areCredentials, select }: DataListProps) => Object.keys(dataField).length ? <div>
  {Object.keys(dataField).map((key) => <React.Fragment key={key}>
    <LeftBigParagraph>{key}</LeftBigParagraph>
    {dataField[key].map((value, i) => <React.Fragment key={i}>
      <input type="radio" name={key} style={{ float: 'left' }} onChange={(e) => {
        if (e.target.value) select(key, value)
      }} />
      <Paragraph>
        {areCredentials ? credentialToText(key, value) : value}
        {areCredentials && <><br/>{' (Verifiable Credential)'}</>}
      </Paragraph>
    </React.Fragment>)}
  </React.Fragment>)}
</div> : <></>

const SelectiveDisclosureResponse = ({ data: { credentials, claims }, backendUrl, onConfirm }: SelectiveDisclosureProps) => {
  const [selectedCredentials, setSelectedCredentials] = useState({})
  const [selectedClaims, setSelectedClaims] = useState({})

  const selectField = (key: string, value: string, field: SelectiveDisclosureField, setField: (field: SelectiveDisclosureField) => void) => {
    const selectedField: SelectiveDisclosureField = {}
    selectedField[key] = value
    setField(Object.assign({}, field, selectedField))
  }

  const selectCredentials = (key: string, value: string) => selectField(key, value, selectedCredentials, setSelectedCredentials)
  const selectClaims = (key: string, value: string) => selectField(key, value, selectedClaims, setSelectedClaims)

  return <>
    <Header2>Select information to share</Header2>
    <Paragraph>Sharing your information is optional. It will only be shared with {backendUrl}</Paragraph>
    <WideBox>
      <DataList dataField={claims} select={selectClaims} areCredentials={false} />
      <DataList dataField={credentials} select={selectCredentials} areCredentials={true} />
    </WideBox>
    <Button onClick={() => onConfirm({
      credentials: selectedCredentials,
      claims: selectedClaims
    })}>Confirm</Button>
  </>
}

export { DataList, SelectiveDisclosureResponse }
