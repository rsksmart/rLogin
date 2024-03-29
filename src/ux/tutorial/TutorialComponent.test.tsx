// eslint-disable-next-line
import React from 'react'
import { mount } from 'enzyme'
import TutorialComponent from './TutorialComponent'
import { LEDGER_NAME, TREZOR_NAME, DCENT_NAME, getTutorialLocalStorageKey } from '../../lib/hardware-wallets'
import { CHECKBOX_CLASSNAME } from '../../constants/cssSelectors'

describe('Component: Provider', () => {
  const props = {
    handleConnect: jest.fn()
  }

  const testInAllHardwareProviders = (testCase: (providerName: string) => void) => {
    for (const providerName of [LEDGER_NAME, TREZOR_NAME, DCENT_NAME]) {
      testCase(providerName)
    }
  }

  describe('shown tutorial', () => {
    testInAllHardwareProviders((providerName: string) => it(`shows ${providerName} tutorial`, () => {
      const wrapper = mount(<TutorialComponent providerName={providerName} {...props} />)
      // assuming the name in the variable is the same than the one displayed
      expect(wrapper.text()).toContain(providerName)
    }))
  })

  describe('don\'t show again', () => {
    testInAllHardwareProviders((providerName: string) => it(`shows ${providerName} tutorial`, () => {
      const wrapper = mount(<TutorialComponent providerName={providerName} {...props} />)

      wrapper.find(`.${CHECKBOX_CLASSNAME}`).last().simulate('change', { target: { checked: true } })
      wrapper.find('button').last().simulate('click')

      const key = getTutorialLocalStorageKey(providerName)
      expect(localStorage.getItem(key)).toBe('true')
      localStorage.removeItem(key) // TODO: local storage global does not support test concurrency...
    }))
  })
})
