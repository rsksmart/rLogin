import * as Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
// at the top of file , even  , before importing react
// Setup enzyme"s react adapter
Enzyme.configure({ adapter: new Adapter() })
