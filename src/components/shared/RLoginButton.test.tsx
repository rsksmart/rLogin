import React from 'react'
import { mount } from 'enzyme'
import { RLoginButton } from './RLoginButton'

describe('Component: RLoginButton', () => {
  it('renders the component with text', () => {
    const wrapper = mount(<RLoginButton onClick={jest.fn()}>Hello World!</RLoginButton>)
    expect(wrapper).toBeDefined()
    expect(wrapper.text()).toBe('Hello World!')
  })

  it('handles click method', () => {
    const onClick = jest.fn()
    const wrapper = mount(<RLoginButton onClick={onClick}>Hello World!</RLoginButton>)
    wrapper.find('button').simulate('click')
    expect(onClick).toBeCalledTimes(1)
  })

  it('does not click when it is disabled', () => {
    const onClick = jest.fn()
    const wrapper = mount(<RLoginButton disabled={true} onClick={onClick}>Hello World!</RLoginButton>)
    wrapper.find('button').simulate('click')
    expect(onClick).toBeCalledTimes(0)
  })
})
