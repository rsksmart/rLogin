import { utf8ToHex } from 'web3-utils'

const handler = {
  get: function (target: any, prop: string) {
    if (target[prop]) {
      return target[prop]
    }

    if (prop === 'request') {
      return function () {
        const method = arguments[0].method
        if (method === 'eth_chainId' || method === 'eth_accounts') {
          return target.send(method)
        }

        console.log('args', arguments)
        // const params = arguments[0].params && utf8ToHex(arguments[0].params[0])
        const firstParams = arguments[0]
        const params = [utf8ToHex(arguments[0].params[0]), arguments[0].params[1]]
        console.log('params', firstParams)

        return new Promise((resolve, reject) => target.send(
          { method, params },
          (err: Error, res: { result: string }) => {
            console.log('here!', err, res)
            return err ? reject(err) : resolve(res.result)
          }
        ))
      }
    }

    console.log(`the method ${prop} is not on the target`)
  }
}

export const providerWrapper = (provider: any) => new Proxy(provider, handler)
