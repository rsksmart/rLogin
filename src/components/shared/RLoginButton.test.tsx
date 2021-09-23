import React from 'react'
import { mount } from 'enzyme'
import { RLoginButton } from './RLoginButton'

describe('Component: RLoginButton', () => {
  const wrapper = mount(<RLoginButton onclick={jest.fn()}>Hello World!</RLoginButton>)
  it('renders the component', () => {
    expect(wrapper).toBeDefined()
    expect(wrapper.text()).toBe('Hello World!')
  })
})
