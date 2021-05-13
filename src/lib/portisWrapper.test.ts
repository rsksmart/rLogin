import { portisWrapper } from './portisWrapper'

describe('EIP1193 wrapper', () => {
  const legacyProvider = {
    send: (response: any, callback?: any) => {
      return callback
        ? Promise.resolve(callback(null, { result: response }))
        : Promise.resolve(response)
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
  })
})
