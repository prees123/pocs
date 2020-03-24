import layoutReducer, {initialState} from '../../src/reducers/LayoutReducer'
import {SHOW_HEADER_PROGRESS, SHOW_AUTH_POPUP, SET_HEADER_TITLE} from '../../src/actions/actionTypes'

describe('layoutReducer', () => {
  it('should handle SET_HEADER_TITLE', () => {
    const data = {
      headerTitle: 'ohayo gozaimasu'
    }
    const action = {
      type: SET_HEADER_TITLE,
      payload: data
    }

    expect(layoutReducer(initialState, action))
  }),
  it('should handle SHOW_AUTH_POPUP', () => {
    const data = true
    const action = {
      type: SHOW_AUTH_POPUP,
      payload: data
    }

    expect(layoutReducer(initialState, action))
  }),
  it('should handle SHOW_HEADER_PROGRESS', () => {
    const data = true
    const action = {
      type: SHOW_HEADER_PROGRESS,
      payload: data
    }

    expect(layoutReducer(initialState, action))
  })
})
