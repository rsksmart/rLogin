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

          return new Promise((resolve, reject) => target.send(
            { method, params },
            (err: string | null, res: { result?: string, error?: Error }) =>
              err ? reject(res.error) : resolve(res.result)
          ))
        }

      // Mirrors WalletConnect's disconnect method
      case 'disconnect': return target._portis.logout()
    }
  }
}

// This wrapper makes Portis Web SDK EIP-1193 compatible
export const portisWrapper = (provider: any) => new Proxy(provider, handler)
