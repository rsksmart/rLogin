import disconnectFromProvider from './providerDisconnect'

describe('Portis EIP1193 wrapper', () => {
  const dummyProvider = { disconnect: jest.fn() }

  it('disconnects provider', async () => {
    localStorage.setItem('RLOGIN_CACHED_PROVIDER', 'Any Provider')
    await disconnectFromProvider(dummyProvider)
    expect(dummyProvider.disconnect).toBeCalledTimes(1)
  })
  it('removes local storage variables', async () => {
    const RLOGIN_CACHED_PROVIDER = 'RLOGIN_CACHED_PROVIDER'
    const CSRF_TOKEN = 'x-csrf-token'

    localStorage.setItem(RLOGIN_CACHED_PROVIDER, 'Any Provider')
    localStorage.setItem(CSRF_TOKEN, 'Any x-csrf-token')

    expect(localStorage.getItem(RLOGIN_CACHED_PROVIDER)).toEqual('Any Provider')
    expect(localStorage.getItem(CSRF_TOKEN)).toEqual('Any x-csrf-token')

    await disconnectFromProvider(dummyProvider)
    expect(localStorage.getItem(RLOGIN_CACHED_PROVIDER)).toBeNull()
    expect(localStorage.getItem(CSRF_TOKEN)).toBeNull()
  })
})
