import { utf8ToHex } from 'web3-utils'

const formatParams = (args: any) =>
  args.method === 'personal_sign'
    ? [utf8ToHex(args.params[0]), args.params[1]]
    : args.params

const handler = {
  get: function (target: any, prop: string) {
    if (target[prop]) {
      return target[prop]
    }

    if (prop === 'request') {
      return function () {
        const method = arguments[0].method

        // chainId and accounts return as a Promise
        if (method === 'eth_chainId' || method === 'eth_accounts' || method === 'net_version') {
          return target.send(method)
        }

        const params = formatParams(arguments[0])

        return new Promise((resolve, reject) => target.send(
          { method, params },
          (err: string | null, res: { result?: string, error?: Error }) =>
            err ? reject(res.error) : resolve(res.result)
        ))
      }
    }
  }
}

export const portisWrapper = (provider: any) => new Proxy(provider, handler)
