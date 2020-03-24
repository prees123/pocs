import React from 'react'
import { shallow } from 'enzyme'
import { Header } from '../../src/components/Header/Header'

describe('Header component', () => {
  it('renders', () => {
    const header = shallow(
      <Header title="Home" />
    )
    expect(header).toHaveLength(1)
  })
})
