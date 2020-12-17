// eslint-disable-next-line
import React, { useState } from 'react'
import { Button } from '../../ui/shared/Button'
import { Paragraph, LeftBigParagraph } from '../../ui/shared/Typography'
import { WideBox } from '../../ui/shared/Box'
import { decodeJWT } from 'did-jwt'

type DataField = { [key: string]: string[] }

export type Data = {
  credentials: DataField
  claims: DataField
}

type SelectiveDisclosureField = { [key: string]: string }

export interface SD {
  credentials: SelectiveDisclosureField
  claims: SelectiveDisclosureField
}

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

// Use this function to add new Verifiable Credential Schema rendering
// We need to improve the errors thrown at this stage. We could display
// the credential ID with a link to the Id Manager
function credentialToText (schema: string, jwt: string) {
  try {
    const jwtDecoded = decodeJWT(jwt)
    console.log(jwtDecoded)
    try {
      const credentialSubject = jwtDecoded.payload.vc.credentialSubject
      switch (schema) {
        case 'Email': return `Email address: ${credentialSubject.emailAddress}`
        default: return JSON.stringify(credentialSubject)
      }
    } catch (e) {
      return 'Invalid credential schema...'
    }
  } catch (e) {
    return 'Invalid credential...'
  }
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
    <Paragraph>Select the information you want to share with {backendUrl}</Paragraph>
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
