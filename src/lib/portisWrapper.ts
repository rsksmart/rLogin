import { utf8ToHex } from 'web3-utils'

const handler = {
  get: function (target: any, prop: string) {
    if (target[prop]) {
      return target[prop]
    }

    if (prop === 'request') {
      return function () {
        // chainId and accounts return as a Promise
        const method = arguments[0].method
        if (method === 'eth_chainId' || method === 'eth_accounts') {
          return target.send(method)
        }

        const params = [utf8ToHex(arguments[0].params[0]), arguments[0].params[1]]

        return new Promise((resolve, reject) => target.send(
          { method, params },
          (err: Error, res: { result: string }) => err ? reject(err) : resolve(res.result)
        ))
      }
    }
  }
}

export const portisWrapper = (provider: any) => new Proxy(provider, handler)
