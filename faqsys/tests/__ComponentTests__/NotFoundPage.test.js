import React from 'react'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from '../../src/store/configureStore'
import NotFound from '../../src/components/Layout/NotFoundPage'

describe('NotFound Page component', () => {
  const store = configureStore()

  it('renders', () => {
    shallow(<Provider store={store}>
      <NotFound />
    </Provider>)
  })
})
