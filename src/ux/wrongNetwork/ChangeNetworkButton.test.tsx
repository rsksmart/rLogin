// eslint-disable-next-line no-use-before-define
import React from 'react'
import { mount } from 'enzyme'
import ChangeNetworkButton from './ChangeNetworkButton'
import { networks } from './changeNetwork'

describe('Component: ChangeNetworkButton', () => {
  const params = networks.get(30)
  const sharedProps = {
    changeNetwork: jest.fn(),
    params
  }

  it('renders the component', () => {
    const wrapper = mount(<ChangeNetworkButton {...sharedProps} />)
    expect(wrapper).toBeDefined()
    expect(wrapper.text()).toBe('RSK Mainnet')
  })

  it('displays an image when passed', () => {
    const wrapper = mount(<ChangeNetworkButton {...sharedProps} />)
    expect(wrapper.find('span')).toHaveLength(1)
  })

  it('handles changeNetwork click', () => {
    const changeNetwork = jest.fn()
    const localProps = { ...sharedProps, changeNetwork }
    const wrapper = mount(<ChangeNetworkButton {...localProps} />)
    wrapper.find('button').simulate('click')

    expect(changeNetwork).toBeCalledTimes(1)
    expect(changeNetwork).toBeCalledWith(params)
  })
})
