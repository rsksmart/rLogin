export type TorusNetworkParams = {
  host: string,
  chainId: number,
  networkId: number,
  blockExplorer: string,
  ticker: string,
  tickerName: string,
  networkName: string,
}

export type PortisNetworkParams = {
  chainId: number,
  nodeUrl: string
}

export type NetworkParamsOptions<T> = {
  [key:string]: T
}

export type NetworkParamsAllOptions = NetworkParamsOptions<TorusNetworkParams> | NetworkParamsOptions<PortisNetworkParams>
export type NetworkParams = TorusNetworkParams | PortisNetworkParams
