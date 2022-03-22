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

  it('handles the ethereum/metamask checkbox', () => {
    const localProps = {
      ...sharedProps,
      chooseNetwork: jest.fn(),
      providerName: 'Ledger'
    }
    const wrapper = mount(<ChooseNetworkComponent {...localProps} />)

    wrapper.find('select').at(0).simulate('change', {
      target: { value: '30', name: 'RSK Mainnet' }
    })

    wrapper.find('input[type="checkbox"]').simulate('change', { target: { checked: true } })

    wrapper.find('button').simulate('click')
    expect(localProps.chooseNetwork).toBeCalledWith({
      chainId: 30, rpcUrl: 'http://30', dPath: "m/44'/60'/0'/0/0"
    })
  })

  it('does not show a dropdown when it is a single network', () => {
    const localProps = {
      ...sharedProps,
      rpcUrls: {
        31: 'http://31'
      }
    }

    const wrapper = mount(<ChooseNetworkComponent {...localProps} />)

    expect(wrapper.find('h2').text()).toBe('Connecting to:')
    expect(wrapper.find('h3').text()).toBe('RSK Testnet')
  })
})
