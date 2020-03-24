import React from 'react'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from '../../src/store/configureStore'
import { Notifications } from '../../src/components/Notifications/Notifications'

describe('Notifications component', () => {
  const store = configureStore()
  it('renders', () => {
    shallow(
      <Provider store={store}>
        <Notifications />
      </Provider>
    )
  })
})
