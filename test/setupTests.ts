import 'jsdom-global/register'
import * as Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

interface IStore {
    [key: string]: any
  }

class LocalStorageMock {
    private store: IStore

    constructor () {
      this.store = {}

      this.getItem.bind(this)
      this.setItem.bind(this)
      this.clear.bind(this)
      this.removeItem.bind(this)
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

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new Adapter() })

Object.defineProperty(window, 'localStorage', { value: new LocalStorageMock() })

// mocking TextEncoder/TextDecoder
const { TextEncoder, TextDecoder } = require('util')

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

global.localStorage = new LocalStorageMock() as any
