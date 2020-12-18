import DataVault from '@rsksmart/ipfs-cpinner-client'
import { getContentsFromDataVault } from './data-vault'

export interface SDR {
  credentials: string[]
  claims: string[]
}

export type DataField = { [key: string]: string[] }

export type Data = {
  credentials: DataField
  claims: DataField
}

export type SelectiveDisclosureField = { [key: string]: string }

export interface SD {
  credentials: SelectiveDisclosureField
  claims: SelectiveDisclosureField
}

const fillDataField = async (data: Data, sdr: SDR, dataVault: DataVault, did: string, field: 'credentials' | 'claims', keyAdapter: (key: string) => string) => {
  for (const credential of sdr![field]) {
    const key = keyAdapter(credential)
    // TODO: add get many on Data Vault
    data[field][credential] = await getContentsFromDataVault(dataVault, did, key)
  }
}

export const fetchSelectiveDisclosureRequest = async (sdr: SDR, dataVault: DataVault, did: string) => {
  const data: Data = {
    credentials: {},
    claims: {}
  }

  await fillDataField(data, sdr, dataVault, did, 'credentials', (credential: string) => `${credential}VerifiableCredential`)
  await fillDataField(data, sdr, dataVault, did, 'claims', (claim: string) => `DD_${claim.toUpperCase()}`)

  return data
}
