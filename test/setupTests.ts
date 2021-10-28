import 'jsdom-global/register'
import * as Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import LocalStorageMock from './localStorageMock'

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new Adapter() })

Object.defineProperty(window, 'localStorage', { value: new LocalStorageMock() })

// mocking TextEncoder/TextDecoder
const { TextEncoder, TextDecoder } = require('util')

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

global.localStorage = new LocalStorageMock() as any
