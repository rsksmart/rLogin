import 'jsdom-global/register'
import * as Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import LocalStorageMock from './LocalStorageMock'

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new Adapter() })

Object.defineProperty(window, 'localStorage', { value: LocalStorageMock })

// mocking TextEncoder/TextDecoder
const { TextEncoder, TextDecoder } = require('util')

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
