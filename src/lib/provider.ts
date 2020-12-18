// https://eips.ethereum.org/EIPS/eip-1193
interface RequestArguments {
  readonly method: string;
  readonly params?: readonly unknown[] | object;
}

export interface EIP1193Provider {
  request<T = unknown>(args: RequestArguments): Promise<T>
}

export const ethAccounts = (provider: EIP1193Provider) => provider.request<string[]>({ method: 'eth_accounts' })
export const ethChainId = (provider: EIP1193Provider) => provider.request<string>({ method: 'eth_chainId' })
export const personalSign = (provider: EIP1193Provider, address: string, data: string) => provider.request({ method: 'personal_sign', params: [data, address] })
