import React from 'react'
import { mount } from 'enzyme'
import { ConfirmInformation } from './ConfirmInformation'
import { CHECKBOX_CLASSNAME, LIST_TITLE, LIST_DESCRIPTION, LIST_NETWORK, LIST_CLICKABLE } from '../../constants/cssSelectors'

const rawEmailCredential = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiRW1haWwiXSwiY3JlZGVudGlhbFNjaGVtYSI6eyJpZCI6ImRpZDpldGhyOnJzazoweDhhMzJkYTYyNGRkOWZhZDhiZjRmMzJkOTQ1NmYzNzRiNjBkOWFkMjg7aWQ9MWViMmFmNmItMGRlZS02MDkwLWNiNTUtMGVkMDkzZjliMDI2O3ZlcnNpb249MS4wIiwidHlwZSI6Ikpzb25TY2hlbWFWYWxpZGF0b3IyMDE4In0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImVtYWlsQWRkcmVzcyI6ImlsYW5AaW92bGFicy5vcmcifX0sInN1YiI6ImRpZDpldGhyOnJzazp0ZXN0bmV0OjB4ODQ5NGE5OGYyYWVjM2ZiYjU0NTM4NDQ2ZWE3YjEyMDVlMjk0MGE5ZiIsIm5iZiI6MTYyNzMwMzgyNSwiaXNzIjoiZGlkOmV0aHI6cnNrOjB4RmNjN2U2OTFiM2I2MzE4MjlDOTY0OTA1NjlhYTVGMUUzMWVGQWY4ZiJ9.QTM0GdAoM-ObLqJacfQ4E0kQSpbENpFT3BdDyxt526lQwTgbcGdR8gJ892FyZKUSJX9cSiT_FcfkTc6XV_I9Bg'
const email = 'ilan@iovlabs.org'

describe('Component: ConfirmInformation', () => {
  const providerUserOption = { name: 'test1', logo: 'test1.jpg', description: 'description1', onClick: jest.fn() }

  const props = {
    chainId: 31,
    address: '0xA1673f6ec41cE19814B412bC633D59e4119eCD17',
    providerUserOption,
    sd: undefined,
    provider: undefined,
    providerName: 'provider',
    onConfirm: jest.fn(),
    onCancel: jest.fn(),
    displayMode: false,
    infoOptions: {},
    showChangeNetwork: jest.fn(),
    disconnect: jest.fn()
  }

  beforeEach(() => {
    props.onConfirm.mockClear()
    props.onCancel.mockClear()
    props.showChangeNetwork.mockClear()
    props.disconnect.mockClear()
    props.providerUserOption.onClick.mockClear()
  })

  describe('wallet types', () => {

    it('simple wallet with no explorer', () => {
      const wrapper = mount(<ConfirmInformation {...props} />)

      expect(wrapper.find('img').at(0).prop('src')).toBeDefined()
      expect(wrapper.find('h2').text()).toBe(' Successfully connected')

      expect(wrapper.find('img').at(1).prop('src')).toBe(providerUserOption.logo)

      expect(wrapper.find(`dd.${LIST_DESCRIPTION}`).at(0).text()).toBe('0xA167...CD17')
      expect(wrapper.find(`span.${LIST_CLICKABLE}`).at(0).text()).toContain('copy')

      expect(wrapper.find(`dt.${LIST_TITLE}`).at(0).text()).toBe('Wallet:')
      expect(wrapper.find(`dd.${LIST_DESCRIPTION}`).at(1).text()).toBe('test1')

      expect(wrapper.find(`dt.${LIST_TITLE}`).at(1).text()).toBe('Network:')
      expect(wrapper.find(`span.${LIST_NETWORK}`).at(0).text()).toBe('RSK Testnet')

      expect(wrapper.find(window.location.href)).toBeDefined()
    })

    it('simple wallet with explorer', () => {
      const addressBaseURL = 'https://addressbase/'
      const wrapper = mount(<ConfirmInformation {...{ ...props, infoOptions: { 31: { addressBaseURL } } }} />)
      const focus = jest.fn()
      window.open = jest.fn(() => ({ focus }) as any)

      const link = wrapper.find(`span.${LIST_CLICKABLE}`).at(1)
      expect(link.text()).toContain('explorer')

      link.simulate('click')
      expect(window.open).toBeCalledWith(addressBaseURL + props.address, '_blank')
      expect(focus).toBeCalled()
    })

    it('wallet connect', () => {
      const peerProps = {
        ...props,
        provider: {
          wc: {
            peerMeta: {
              name: 'Wallet Test 1',
              icons: ['logo.jpg']
            }
          }
        }
      }

      const wrapper = mount(<ConfirmInformation {...peerProps} />)

      expect(wrapper.find('img').at(0).prop('src')).toBeDefined()
      expect(wrapper.find('h2').text()).toBe(' Successfully connected')

      expect(wrapper.find('img').at(1).prop('src')).toBe(providerUserOption.logo)
      expect(wrapper.find('img').at(2).prop('src')).toBe('logo.jpg')

      expect(wrapper.find(`dd.${LIST_DESCRIPTION}`).at(0).text()).toBe('0xA167...CD17')
      expect(wrapper.find(`span.${LIST_CLICKABLE}`).at(0).text()).toContain('copy')

      expect(wrapper.find(`dt.${LIST_TITLE}`).at(0).text()).toBe('Wallet:')
      expect(wrapper.find(`dd.${LIST_DESCRIPTION}`).at(1).text()).toBe('test1')

      expect(wrapper.find(`dt.${LIST_TITLE}`).at(1).text()).toBe('Connected wallet:')
      expect(wrapper.find(`dd.${LIST_DESCRIPTION}`).at(2).text()).toBe('Wallet Test 1')

      expect(wrapper.find(`dt.${LIST_TITLE}`).at(2).text()).toBe('Network:')
      expect(wrapper.find(`span.${LIST_NETWORK}`).at(0).text()).toBe('RSK Testnet')

      expect(wrapper.find(window.location.href)).toBeDefined()
    })

    it('shows dpath for hardware provider', () => {
      const wrapper = mount(<ConfirmInformation {...props} provider={{ dpath: 'dpath', isLedger: true }} />)

      expect(wrapper.find(`dt.${LIST_TITLE}`).at(2).text()).toBe('Derivation path:')
      expect(wrapper.find(`dd.${LIST_DESCRIPTION}`).at(2).text()).toBe('dpath')
    })
  })

  it('checkbox should work properly', () => {
    const wrapper = mount(<ConfirmInformation {...props} />)

    const checkbox = () => wrapper.find(`input.${CHECKBOX_CLASSNAME}`)

    expect(global.localStorage.getItem('RLogin:DontShowAgain')).toBeNull()
    expect(checkbox().prop('checked')).toBe(false)

    checkbox().simulate('change', { target: { checked: true } })

    expect(checkbox().prop('checked')).toBe(true)
    expect(global.localStorage.getItem('RLogin:DontShowAgain')).toBe('true')

    checkbox().simulate('change', { target: { checked: false } })

    expect(checkbox().prop('checked')).toBe(false)
    expect(global.localStorage.getItem('RLogin:DontShowAgain')).toBe('false')
  })

  it('selective disclosure', () => {
    const wrapper = mount(<ConfirmInformation {...{ ...props, sd: {
      claims: { 'Name': 'Bob' },
      credentials: { 'Email': rawEmailCredential }
    } }} />)

    expect(wrapper.find(`dt.${LIST_TITLE}`).at(2).text()).toBe('Name:')
    expect(wrapper.find(`dd.${LIST_DESCRIPTION}`).at(2).text()).toBe('Bob')

    expect(wrapper.find(`dt.${LIST_TITLE}`).at(3).text()).toBe('Email:')
    expect(wrapper.find(`dd.${LIST_DESCRIPTION}`).at(3).text()).toBe(email)
  })


  describe('display mode', () => {
    it('confirm info', () => {
      const wrapper = mount(<ConfirmInformation {...props} displayMode={false} />)

      expect(wrapper.find('button.confirm').exists()).toBe(true)
      expect(wrapper.find('button.cancel').exists()).toBe(true)
      expect(wrapper.find('button.disconnect').exists()).toBe(false)
      expect(wrapper.find('button.change-network').exists()).toBe(false)
    })

    it('show info', () => {
      const wrapper = mount(<ConfirmInformation {...props} displayMode={true} />)

      expect(wrapper.find('button.confirm').exists()).toBe(false)
      expect(wrapper.find('button.cancel').exists()).toBe(false)
      expect(wrapper.find('button.disconnect').exists()).toBe(true)
      expect(wrapper.find('button.change-network').exists()).toBe(true)
    })
  })

  describe('actions', () => {
    it('confirm should call onConfirm prop', () => {
      const wrapper = mount(<ConfirmInformation {...props} />)

      wrapper.find('button.confirm').simulate('click')

      expect(props.onConfirm).toBeCalled()
      expect(props.onCancel).not.toBeCalled()
    })

    it('cancel should call onCancel prop', () => {
      const wrapper = mount(<ConfirmInformation {...props} />)

      wrapper.find('button.cancel').simulate('click')

      expect(props.onConfirm).not.toBeCalled()
      expect(props.onCancel).toBeCalled()
    })

    it('disconnect should call disconnect prop', () => {
      const wrapper = mount(<ConfirmInformation {...props} displayMode={true} />)

      wrapper.find('button.disconnect').simulate('click')

      expect(props.disconnect).toBeCalled()
      expect(props.showChangeNetwork).not.toBeCalled()
    })

    it('change network should call showChangeNetwork prop', () => {
      const wrapper = mount(<ConfirmInformation {...props} displayMode={true} />)

      wrapper.find('button.change-network').simulate('click')

      expect(props.disconnect).not.toBeCalled()
      expect(props.showChangeNetwork).toBeCalled()
    })
  })
})
