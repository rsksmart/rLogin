import React from 'react'
import { mount } from 'enzyme'
import { ConfirmInformation } from './ConfirmInformation'
import { CHECKBOX_CLASSNAME, LIST_TITLE, LIST_DESCRIPTION } from '../../constants/cssSelectors'

interface IStore {
  [key: string]: any
}

export class LocalStorageMock {
  private store: IStore

  constructor () {
    this.store = {}
  }

  clear () {
    this.store = {}
  }

  getItem (key: string) {
    return this.store[key] || null
  }

  setItem (key: string, value: any) {
    this.store[key] = String(value)
  }

  removeItem (key: string) {
    delete this.store[key]
  }
};

global.localStorage = new LocalStorageMock() as any

describe('Component: ConfirmInformation', () => {
  const providerUserOption = { name: 'test1', logo: 'test1.jpg', description: 'description1', onClick: jest.fn() }

  const props = {
    chainId: 31,
    address: '0xA1673f6ec41cE19814B412bC633D59e4119eCD17',
    providerUserOption,
    sd: undefined,
    provider: undefined,
    onConfirm: jest.fn(),
    onCancel: jest.fn(),
    displayMode: false
  }

  beforeEach(() => {
    props.onConfirm.mockClear()
    props.onCancel.mockClear()
    props.providerUserOption.onClick.mockClear()
  })

  it('renders and is defined', () => {
    const wrapper = mount(<ConfirmInformation {...props} />)
    expect(wrapper).toBeDefined()
  })

  it('shows the correct information', () => {
    const wrapper = mount(<ConfirmInformation {...props} />)
    expect(wrapper.find('h2').text()).toBe('Information')

    expect(wrapper.find(`dt.${LIST_TITLE}`).at(0).text()).toBe('Wallet address:')
    expect(wrapper.find(`dt.${LIST_TITLE}`).at(1).text()).toBe('Network:')

    expect(wrapper.find(`dd.${LIST_DESCRIPTION}`).at(0).text()).toBe('0xA167...CD17')
    expect(wrapper.find(`dd.${LIST_DESCRIPTION}`).at(1).text()).toBe('RSK Testnet')

    expect(wrapper.find('img').prop('src')).toBe(providerUserOption.logo)
  })

  it('shows the peer logo and name', () => {
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
    expect(wrapper.find('h2').text()).toBe('Information')

    expect(wrapper.find(`dt.${LIST_TITLE}`).at(0).text()).toBe('Wallet address:')
    expect(wrapper.find(`dt.${LIST_TITLE}`).at(1).text()).toBe('Connected wallet:')
    expect(wrapper.find(`dt.${LIST_TITLE}`).at(2).text()).toBe('Network:')

    expect(wrapper.find(`dd.${LIST_DESCRIPTION}`).at(0).text()).toBe('0xA167...CD17')
    expect(wrapper.find(`dd.${LIST_DESCRIPTION}`).at(1).text()).toBe('Wallet Test 1')
    expect(wrapper.find(`dd.${LIST_DESCRIPTION}`).at(2).text()).toBe('RSK Testnet')

    expect(wrapper.find('img').at(0).prop('src')).toBe(providerUserOption.logo)
    expect(wrapper.find('img').at(1).prop('src')).toBe('logo.jpg')
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

  it('confirm should call onConfirm prop', () => {
    const wrapper = mount(<ConfirmInformation {...props} />)

    wrapper.find('button.confirm').simulate('click')

    expect(props.onConfirm).toBeCalled()
    expect(props.onCancel).not.toBeCalled()
  })

  it('cancel should call onCancel prop', () => {
    const wrapper = mount(<ConfirmInformation {...props} />)

    const cancelButton = wrapper.find('button.cancel')

    cancelButton.simulate('click')

    expect(props.onConfirm).not.toBeCalled()
    expect(props.onCancel).toBeCalled()
  })

  it('mode == display should not show any action button', () => {
    const wrapper = mount(<ConfirmInformation {...props} displayMode={true} />)

    const confirmButton = wrapper.find('button.confirm').exists()
    const cancelButton = wrapper.find('button.cancel').exists()
    const checkbox = wrapper.find(`input.${CHECKBOX_CLASSNAME}`).exists()

    expect(confirmButton).toBe(false)
    expect(cancelButton).toBe(false)
    expect(checkbox).toBe(false)
  })
})
