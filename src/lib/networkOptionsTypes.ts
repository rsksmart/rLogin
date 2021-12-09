export type NetworkParams = {
        host?: string,
        chainId?: number,
        networkId?: number,
        blockExplorer?: string,
        ticker?: string,
        tickerName?: string,
        networkName?: string,
        nodeUrl?: string
  }
export type NetworkParamsOptions = {
    [key:string]: NetworkParams
  }
