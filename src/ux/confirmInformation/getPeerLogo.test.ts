import { getPeerInfo } from './getPeerLogo'

describe('getPeerLogo', () => {
  it('If not peerMeta should return null', () => {
    const info1 = getPeerInfo(undefined)
    const info2 = getPeerInfo(null)

    expect(info1).toBeNull()
    expect(info2).toBeNull()
  })

  it('If peerMeta has name and logo should return the name and logo', () => {
    const info = getPeerInfo({ name: 'Test 1', icons: ['logo.jpg'] })

    expect(info).not.toBeNull()
    expect(info?.name).toBe('Test 1')
    expect(info?.logo).toBe('logo.jpg')
  })

  it('If peerMeta name contains `Trust Wallet` should return the name and logo', () => {
    const info = getPeerInfo({ name: 'Trust wallet plus', icons: [''] })

    expect(info).not.toBeNull()
    expect(info?.name).toBe('Trust Wallet')

    // here should return the right logo but is stub because import img doesn't work with jest.
    expect(info?.logo).toBe('')
  })

  it('If is `Defiant` should return the name and logo', () => {
    const info = getPeerInfo({ name: 'Flutter Client' })

    expect(info).not.toBeNull()
    expect(info?.name).toBe('Defiant')

    // here should return the right logo but is stub because import img doesn't work with jest.
    expect(info?.logo).toBe('')
  })
})
