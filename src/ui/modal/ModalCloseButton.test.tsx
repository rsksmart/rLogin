import React from 'react'
import { shallow } from 'enzyme'
import { ModalCloseButton } from './ModalCloseButton'

describe('Component: ModalCloseButton', () => {
  it('should render and be described', () => {
    const wrapper = shallow(<ModalCloseButton />)
    expect(wrapper).toBeDefined()
  })

  it('should handle click event', () => {
    const onClick = jest.fn()
    const wrapper = shallow(<ModalCloseButton onClick={onClick} />)
    wrapper.find('button').simulate('click')
    expect(onClick).toBeCalledTimes(1)
  })
})
