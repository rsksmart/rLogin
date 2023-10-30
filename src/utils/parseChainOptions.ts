import { AddEthereumChainParameter } from '../ux/wrongNetwork/changeNetwork'
import { InfoOptions } from '../ux/confirmInformation/InfoOptions'

export function parseSupportedChains (ethereumChains?: AddEthereumChainParameter[]): number[] | undefined {
  if (!ethereumChains) return
  return ethereumChains.map(({ chainId }) =>
    parseInt(chainId, 16)
  )
}

export function parseRpcUrls (ethereumChains?: AddEthereumChainParameter[]): Record<string, string> | undefined {
  if (!ethereumChains) return
  return ethereumChains.reduce(
    (acc, { chainId, rpcUrls }) => ({
      ...acc,
      [parseInt(chainId, 16).toString()]: rpcUrls[0]
    }),
    {}
  )
}

export function parseInfoOptions (ethereumChains?: AddEthereumChainParameter[]): InfoOptions | undefined {
  if (!ethereumChains) return
  return ethereumChains.reduce(
    (acc, { chainId, blockExplorerUrls }) => ({
      ...acc,
      [parseInt(chainId, 16)]: {
        addressBaseURL: blockExplorerUrls?.[0]
      }
    }),
    {}
  )
}

export function chainArrToMap (ethereumChains?: AddEthereumChainParameter[]): Map<number, AddEthereumChainParameter> | undefined {
  if (!ethereumChains) return
  return new Map(ethereumChains.map(
    chain => [parseInt(chain.chainId, 16), chain]
  ))
}
