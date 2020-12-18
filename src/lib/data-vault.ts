import { EIP1193Provider } from "./provider"

import DataVault from '@rsksmart/ipfs-cpinner-client'

export const createDataVault = (provider: EIP1193Provider, did: string, address: string) => new DataVault({
  serviceUrl: 'https://identity.staging.rifcomputing.net',
  serviceDid: 'did:ethr:rsk:testnet:0x285B30492a3F444d78f75261A35cB292Fc8F41A6',
  did,
  rpcPersonalSign: (data: string) => provider.request({ method: 'personal_sign', params: [address, data] })
})
