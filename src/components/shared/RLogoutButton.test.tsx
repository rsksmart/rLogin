// eslint-disable-next-line no-use-before-define
import React from 'react'
import { mount } from 'enzyme'
import RLogoutButton from './RLogoutButton'
import { RLOGIN_ACCESS_TOKEN } from '../..'
import { RLOGIN_REFRESH_TOKEN } from '../../constants'
import LocalStorageMock from '../../test/LocalStorageMock'

describe('Component: RLogoutButton', () => {
  it('renders the component', () => {
    const wrapper = mount(<RLogoutButton />)
    expect(wrapper).toBeDefined()
    expect(wrapper.text()).toBe('Logout')
  })

  it('displays custom text', () => {
    const wrapper = mount(<RLogoutButton text="hello world!" />)
    expect(wrapper.text()).toBe('hello world!')
  })

  describe('localStorage functions', () => {
    const setItem = (key: string, value: string) => localStorage.setItem(key, value)

    beforeEach(() => {
      global.localStorage = LocalStorageMock
      localStorage.clear()

      setItem('DAPP_CUSTOM', 'customData')
      setItem(RLOGIN_ACCESS_TOKEN, 'accessToken')
      setItem(RLOGIN_REFRESH_TOKEN, 'refreshToken')
    })

    it('removes the static items', () => {
      const wrapper = mount(<RLogoutButton />)
      wrapper.find('button').simulate('click')

      expect(localStorage.getItem(RLOGIN_ACCESS_TOKEN)).toBeUndefined()
      expect(localStorage.getItem(RLOGIN_REFRESH_TOKEN)).toBeUndefined()
      expect(localStorage.getItem('DAPP_CUSTOM')).toBe('customData')
    })

    /*
    it('removes the all the rLogin and DataVault items', () => {
      const DV_ACCESS_TOKEN = 'DV_ACCESS_TOKEN-did:ethr:rsk:testnet:0x123'
      const DV_REFRESH_TOKEN = 'DV_REFRESH_TOKEN-did:ethr:rsk:testnet:0x123'
      setItem(DV_ACCESS_TOKEN, 'accessToken')
      setItem(DV_REFRESH_TOKEN, 'refreshToken')

      const wrapper = mount(<RLogoutButton />)
      wrapper.find('button').simulate('click')

      expect(localStorage.getItem(RLOGIN_ACCESS_TOKEN)).toBeUndefined()
      expect(localStorage.getItem(RLOGIN_REFRESH_TOKEN)).toBeUndefined()
      expect(localStorage.getItem(DV_ACCESS_TOKEN)).toBeUndefined()
      expect(localStorage.getItem(RLOGIN_REFRESH_TOKEN)).toBeUndefined()

      expect(localStorage.getItem('DAPP_CUSTOM')).toBe('customData')
    })
    */
  })
})
