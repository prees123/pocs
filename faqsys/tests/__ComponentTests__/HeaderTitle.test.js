import React from 'react'
import { shallow } from 'enzyme'
import { HeaderTitle } from '../../src/components/Header/HeaderTitle'

describe('HeaderTitle container', () => {
  const props = {
    setHeaderTitle: jest.fn(),
    title: 'testTitle',
  }

  it('renders', () => {
    const wrapper = shallow(<HeaderTitle {...props} />)

    expect(wrapper).toHaveLength(1)
  })

  describe('life cycle methods', () => {
    it('componentWillMount sets the header title', () => {
      /* eslint-disable no-unused-vars */
      const wrapper = shallow(
        <HeaderTitle
          setHeaderTitle={props.setHeaderTitle}
          title={props.title}
        />
      )
      /* eslint-enable no-unused-vars */

      expect(props.setHeaderTitle).toHaveBeenCalled()
      expect(props.setHeaderTitle).toHaveBeenCalledWith('testTitle')
    })

    it('componentWillReceiveProps calls setHeaderTitle with new title', () => {
      const props = {
        setHeaderTitle: jest.fn(),
        title: '',
      }

      const nextProps = {
        title: 'testTitle',
      }
      const wrapper = shallow(<HeaderTitle {...props} />)

      wrapper.setProps(nextProps)
      expect(props.setHeaderTitle).toHaveBeenCalledWith('testTitle')
    })

    it('componentWillReceiveProps does not call setHeaderTitle if the title is invalid', () => {
      const props = {
        setHeaderTitle: jest.fn(),
        title: 'testTitle',
      }

      const nextProps = {
        title: null,
      }
      const wrapper = shallow(<HeaderTitle {...props} />)

      wrapper.setProps(nextProps)
      expect(props.setHeaderTitle).not.toHaveBeenCalledWith(null)
    })

    it('componentWillReceiveProps does not call setHeaderTitle if the title is the same', () => {
      const props = {
        setHeaderTitle: jest.fn(),
        title: 'testTitle',
      }

      const nextProps = {
        title: 'testTitle',
      }
      const wrapper = shallow(<HeaderTitle {...props} />)

      wrapper.setProps(nextProps)
      expect(props.setHeaderTitle).toHaveBeenCalledTimes(1)
    })
  })
})
