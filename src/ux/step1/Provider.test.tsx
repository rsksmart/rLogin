// eslint-disable-next-line
import React from 'react'
import { mount } from 'enzyme'
import { Provider } from './Provider'
import { PROVIDER_CONTAINER_CLASSNAME } from '../../constants/cssSelectors'

describe('Component: Provider', () => {
  const props = {
    name: 'Test Provider',
    logo: 'image.jpg',
    description: 'A provider',
    onClick: jest.fn(),
    disabled: false,
    width: '100%'
  }

  it('renders and is defined', () => {
    const wrapper = mount(<Provider {...props} />)
    expect(wrapper).toBeDefined()
  })

  it('has correct text and image', () => {
    const wrapper = mount(<Provider {...props} />)
    expect(wrapper.find('h3').text()).toEqual('Test Provider')
    expect(wrapper.find('img').props().src).toEqual('image.jpg')
  })

  it('handles clicking on the parent div', () => {
    const onClick = jest.fn()
    const localProps = { ...props, onClick }
    const wrapper = mount(<Provider {...localProps} />)

    wrapper.find(`div.${PROVIDER_CONTAINER_CLASSNAME}`).simulate('click')
    expect(onClick).toBeCalledTimes(1)
  })

  it('if is disabled should not be fire onClick event', () => {
    const onClick = jest.fn()
    const localProps = { ...props, disabled: true, onClick }
    const wrapper = mount(<Provider {...localProps} />)

    wrapper.find(`div.${PROVIDER_CONTAINER_CLASSNAME}`).simulate('click')
    expect(onClick).toBeCalledTimes(0)
  })
})
