import { utf8ToHex } from 'web3-utils'

const handler = {
  get: function (target: any, prop: string) {
    if (target[prop]) {
      return target[prop]
    }

    switch (prop) {
      // add request method that calls Portis' send method and returns a promise
      case 'request':
        return function () {
          const method = arguments[0].method

          // chainId and accounts return as a Promise
          if (method === 'eth_chainId' || method === 'eth_accounts' || method === 'net_version') {
            return target.send(method)
          }

          // format params if using personal_sign
          const params = (method === 'personal_sign')
            ? [utf8ToHex(arguments[0].params[0]), arguments[0].params[1]]
            : arguments[0].params

          // return a promise
          return new Promise((resolve, reject) => {
            // final step: send the transaction and resolve or reject the promise
            const sendTransaction = (tMethod: string, tPrams: any) => target.send(
              { method: tMethod, params: tPrams },
              (err: string | null, res: { result?: string, error?: Error }) =>
                err ? reject(res.error) : resolve(res.result))

            // for sendTransaction, get the gasPrice from the last block if the developer did not
            // include it. Portis does not calculate it correctly, causing the transaction to fail
            if ((method === 'eth_sendTransaction' || method === 'eth_sendRawTransaction') && !params[0].gasPrice) {
              return target.send({ method: 'eth_getBlockByNumber', params: ['latest', false] },
                (err: string | null, res: any) =>
                  err ? reject(res.err) : sendTransaction(method, [{ ...params[0], gasPrice: res.result.minimumGasPrice * 1.01 }])
              )
            }

            // not sending transaction, or developer included gasPrice, no modifications needed
            return sendTransaction(method, params)
          })
        }

      // Mirrors WalletConnect's disconnect method
      case 'disconnect': return target._portis.logout()
    }
  }
}

// This wrapper makes Portis Web SDK EIP-1193 compatible
export const portisWrapper = (provider: any) => new Proxy(provider, handler)
