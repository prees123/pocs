import React from 'react'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from '../../src/store/configureStore'
import HomePage from '../../src/containers/HomePage/HomePage'

describe('Home Page component', () => {
  const store = configureStore()

  it('renders', () => {
    const div = document.createElement('div')
    shallow(
      <Provider store={store}>
        <HomePage />
      </Provider>, div)
  })
})
