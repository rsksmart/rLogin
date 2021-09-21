import React from 'react'
import { shallow } from 'enzyme'
import { Header2, Paragraph } from './Typography'
import { HEADER2_CLASS, PARAGRAPH_CLASS } from '../../constants/cssSelectors'

describe('Typography', () => {
  describe('Component: Header2', () => {
    it('has content and default class', () => {
      const wrapper = shallow(<Header2>Hello header 2</Header2>)
      expect(wrapper.text()).toEqual('Hello header 2')
      expect(wrapper.hasClass(HEADER2_CLASS)).toBeTruthy()
    })

    it('has default and custom class', () => {
      const wrapper = shallow(<Header2 className="alternate">Hello header 2</Header2>)
      expect(wrapper.hasClass(HEADER2_CLASS)).toBeTruthy()
      expect(wrapper.hasClass('alternate')).toBeTruthy()
    })
  })

  describe('Component: Paragraph', () => {
    it('has content and default class', () => {
      const wrapper = shallow(<Paragraph>Hello Paragraph</Paragraph>)
      expect(wrapper.text()).toEqual('Hello Paragraph')
      expect(wrapper.hasClass(PARAGRAPH_CLASS)).toBeTruthy()
    })

    it('has default and custom class', () => {
      const wrapper = shallow(<Paragraph className="alternate">Hello Paragraph</Paragraph>)
      expect(wrapper.hasClass(PARAGRAPH_CLASS)).toBeTruthy()
      expect(wrapper.hasClass('alternate')).toBeTruthy()
    })
  })
})
