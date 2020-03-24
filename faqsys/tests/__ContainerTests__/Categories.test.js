import React from 'react'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from '../../src/store/configureStore'
import Categories from '../../src/containers/Categories/Categories'

describe('Categories component', () => {
  const store = configureStore()

  it('renders', () => {
    shallow(<Provider store={store}>
      <Categories />
    </Provider>)
  })
})
