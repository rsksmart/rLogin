export type NetworkParams = {
    networkParams : {
        host: string,
        chainId: number,
        networkId: number,
        blockExplorer: string,
        ticker: string,
        tickerName: string,
        networkName: string
    }
  }
export type NetworkParamsOptions = {
    [key:string]: NetworkParams
  }
