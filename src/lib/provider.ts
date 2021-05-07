import { AddEthereumChainParameter } from '../ux/wrongNetwork/changeNetwork'
import { utf8ToHex } from 'web3-utils'

// https://eips.ethereum.org/EIPS/eip-1193
interface RequestArguments {
  readonly method: string;
  readonly params?: readonly unknown[] | object;
}

export interface EIP1193Provider {
  request<T = string>(args: RequestArguments): Promise<T>
  isMetaMask: boolean | null
  isNiftyWallet: boolean | null
}

export interface OlderProvider {
  send(param: string | { method: string, params: string[]}, callback?: ((err: Error, res: any) => void) | undefined): Promise<any>
  isPortis: boolean | null
}

export interface GenericProvider extends EIP1193Provider, OlderProvider {}

export const ethAccounts = (provider: GenericProvider) =>
  provider.request
    ? provider.request<string[]>({ method: 'eth_accounts' })
    : provider.send('eth_accounts')

export const ethChainId = (provider: GenericProvider) =>
  provider.request
    ? provider.request<string>({ method: 'eth_chainId' })
    : provider.send('eth_chainId')

export const personalSign = (provider: GenericProvider, address: string, data: string) => {
  return (provider.isPortis)
    ? new Promise((resolve, reject) => provider.send(
      { method: 'personal_sign', params: [utf8ToHex(data), address] },
      (err: Error, res: { result: string }) => err ? reject(err) : resolve(res.result)
    ))
    : provider.request({ method: 'personal_sign', params: [data, address] })
}

export const addEthereumChain = (provider: EIP1193Provider, params: AddEthereumChainParameter) => provider.request({ method: 'wallet_addEthereumChain', params: [params] })

export const isMetamask = (provider: EIP1193Provider) => provider.isMetaMask && !provider.isNiftyWallet
