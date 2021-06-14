import { portisWrapper } from './portisWrapper'

describe('Portis EIP1193 wrapper', () => {
  const legacyProvider = {
    send: (response: any, callback?: any) => {
      let customResponse
      if (response.method === 'eth_getBlockByNumber') {
        customResponse = { minimumGasPrice: '15' }
      }

      return callback
        ? Promise.resolve(callback(null, { result: customResponse || response }))
        : Promise.resolve(customResponse || response)
    }
  }
  const wrapper = portisWrapper(legacyProvider)

  it('object is returned', () => {
    expect(wrapper).toBeTruthy()
  })

  it('request is defined', () => {
    expect(wrapper.request).toBeDefined()
  })

  describe('methods', () => {
    it('eth_chainId', () => {
      return wrapper.request({ method: 'eth_chainId' })
        .then((res: any) => expect(res).toEqual('eth_chainId'))
    })

    it('net_version', () => {
      return wrapper.request({ method: 'net_version' })
        .then((res: any) => expect(res).toEqual('net_version'))
    })

    it('eth_accounts', () => {
      return wrapper.request({ method: 'eth_accounts' })
        .then((res: any) => expect(res).toEqual('eth_accounts'))
    })

    it('personal_sign', async () => {
      const request = { method: 'personal_sign', params: ['my message', '0x123456'] }
      const expected = {
        method: 'personal_sign',
        params: ['0x6d79206d657373616765', '0x123456']
      }

      return wrapper.request(request).then((res: any) => expect(res).toEqual(expected))
    })

    it('eth_sendTransaction, adds gasPrice if not sent', () => {
      const params = [{ to: '0x123', from: '0x456', value: 100000 }]
      const request = { method: 'eth_sendTransaction', params }
      return wrapper.request(request).then((res: any) => {
        expect(res).toEqual({
          method: 'eth_sendTransaction', params: [{ to: '0x123', from: '0x456', value: 100000, gasPrice: '15' }]
        })
      })
    })

    it('eth_sendTransaction, with developer gasPrice', () => {
      const params = [{ to: '0x123', from: '0x456', value: 100000, gasPrice: '20' }]
      const request = { method: 'eth_sendTransaction', params }
      return wrapper.request(request).then((res: any) => {
        expect(res).toEqual({ method: 'eth_sendTransaction', params })
      })
    })
  })
})
