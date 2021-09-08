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
    width: '100%'
  }

  it('renders and is defined', () => {
    const wrapper = mount(<Provider {...props} />)
    expect(wrapper).toBeDefined()
  })

  it('has correct text and image', () => {
    const wrapper = mount(<Provider {...props} />)
    expect(wrapper.find('h3').text()).toEqual('Test Provider')
    expect(wrapper.find('p').text()).toEqual('A provider')
    expect(wrapper.find('img').props().src).toEqual('image.jpg')
  })

  it('handles clicking on the parent div', () => {
    const onClick = jest.fn()
    const localProps = { ...props, onClick }
    const wrapper = mount(<Provider {...localProps} />)

    wrapper.find(`div.${PROVIDER_CONTAINER_CLASSNAME}`).simulate('click')
    expect(onClick).toBeCalledTimes(1)
  })
})
