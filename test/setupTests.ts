import 'jsdom-global/register'
import * as Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import LocalStorageMock from '../src/test/LocalStorageMock'

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new Adapter() })

Object.defineProperty(window, 'localStorage', { value: LocalStorageMock })
