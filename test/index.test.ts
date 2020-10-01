import rLogin from '../src'

describe('rLogin default export', () => {
  test('welcome', () => {
    expect(rLogin()).toEqual('Welcome to rLogin')
  })
})
