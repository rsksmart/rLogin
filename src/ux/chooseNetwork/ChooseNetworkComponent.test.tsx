// eslint-disable-next-line no-use-before-define
import React from 'react'
import { mount } from 'enzyme'
import ChooseNetworkComponent from './ChooseNetworkComponent'

describe('Component: ChooseNetworkComponent', () => {
  const sharedProps = {
    rpcUrls: {
      1: 'http://1',
      30: 'http://30',
      31: 'http://31'
    },
    chooseNetwork: jest.fn(),
    providerName: 'provider'
  }

  it('renders the component', () => {
    const wrapper = mount(<ChooseNetworkComponent {...sharedProps} />)
    expect(wrapper).toBeDefined()
  })

  it('renders the select options', () => {
    const wrapper = mount(<ChooseNetworkComponent {...sharedProps} />)
    expect(wrapper.find('select').children()).toHaveLength(3)
    expect(wrapper.find('option').at(0).props().value).toBe('1')
    expect(wrapper.find('option').at(0).text()).toBe('Ethereum Mainnet')
  })

  it('handles the click method', () => {
    const localProps = {
      ...sharedProps,
      chooseNetwork: jest.fn()
    }
    const wrapper = mount(<ChooseNetworkComponent {...localProps} />)

    wrapper.find('button').simulate('click')
    expect(localProps.chooseNetwork).toBeCalledWith({ chainId: 1, rpcUrl: 'http://1' })
  })
})
