import React from 'react'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from '../../src/store/configureStore'
import Articles from '../../src/containers/Articles/Articles'

describe('Articles component', () => {
  const store = configureStore()

  it('renders', () => {
    shallow(<Provider store={store}>
      <Articles />
    </Provider>)
  })
})
