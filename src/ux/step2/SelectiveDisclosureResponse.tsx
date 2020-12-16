// eslint-disable-next-line
import React, { useState } from 'react'
import { Button } from '../../ui/shared/Button'

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
  title: string
  select: (key: string, value: string) => void
}

const DataList = ({ dataField, title, select }: DataListProps) => Object.keys(dataField).length ? <div style={{ maxWidth: 300 }}>
  <p>{title}</p>
  {Object.keys(dataField).map((key) => <div key={key}>
    {dataField[key].map((value, i) => <div key={i}>
      <input type="radio" name={key} onChange={(e) => {
        if (e.target.value) select(key, value)
      }} />
      {value}
    </div>)}
  </div>)}
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
    <p>Would you like to give us access to info in your data vault?</p>
    <p>Select the information you want to share with {backendUrl}</p>
    <DataList dataField={credentials} select={selectCredentials} title="Credentials" />
    <DataList dataField={claims} select={selectClaims} title="Claims" />
    <Button onClick={() => onConfirm({
      credentials: selectedCredentials,
      claims: selectedClaims
    })}>Confirm</Button>
  </>
}

export { DataList, SelectiveDisclosureResponse }
