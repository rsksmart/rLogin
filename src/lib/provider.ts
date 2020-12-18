// https://eips.ethereum.org/EIPS/eip-1193
interface RequestArguments {
  readonly method: string;
  readonly params?: readonly unknown[] | object;
}

export interface EIP1193Provider {
  request<T = unknown>(args: RequestArguments): Promise<T>
}

export const eth_accounts = (provider: EIP1193Provider) => provider.request<string[]>({ method: 'eth_accounts' })
export const eth_chainId = (provider: EIP1193Provider) => provider.request<string>({ method: 'eth_chainId' })
