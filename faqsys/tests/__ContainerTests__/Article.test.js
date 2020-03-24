import React from 'react'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from '../../src/store/configureStore'
import Article from '../../src/containers/Article/Article'

describe('Article component', () => {
  const store = configureStore()

  it('renders', () => {
    shallow(<Provider store={store}>
      <Article />
    </Provider>)
  })
})
