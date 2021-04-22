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

export interface AddEthereumChainParameter {
  chainId: string;
  chainName?: string;
  nativeCurrency?: {
    name?: string;
    symbol?: string;
    decimals?: 18;
  };
  rpcUrls?: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
}

export const ethAccounts = (provider: EIP1193Provider) => provider.request<string[]>({ method: 'eth_accounts' })
export const ethChainId = (provider: EIP1193Provider) => provider.request<string>({ method: 'eth_chainId' })
export const personalSign = (provider: EIP1193Provider, address: string, data: string) => provider.request({ method: 'personal_sign', params: [data, address] })
export const addEthereumChain = (provider: EIP1193Provider, params: AddEthereumChainParameter) => provider.request({ method: 'wallet_addEthereumChain', params: [params] })

export const isMetamask = (provider: EIP1193Provider) => provider.isMetaMask && !provider.isNiftyWallet
