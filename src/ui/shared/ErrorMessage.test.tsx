// eslint-disable-next-line
import React from 'react'
import { mount } from 'enzyme'
import { ErrorMessage } from './ErrorMessage'

describe('Component: Error Message', () => {
  it('renders and is defined', () => {
    const wrapper = mount(<ErrorMessage title="Error title" />)
    expect(wrapper.find('h2').text()).toBe('Error title')
  })

  it('has correct content', () => {
    const wrapper = mount(<ErrorMessage title="A title" description="Error description" />)
    expect(wrapper.find('h2').text()).toBe('A title')
    expect(wrapper.find('p').text()).toBe('Error description')
  })
})
