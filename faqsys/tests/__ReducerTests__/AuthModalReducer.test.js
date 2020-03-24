import authModalReducer, {initialState} from '../../src/reducers/AuthModalReducer'
import {SHOW_AUTH_MODAL} from  '../../src/actions/actionTypes'

describe('authModalReducer', () => {
  it('should handle SHOW_AUTH_MODAL', () => {
    const data = {
      isShown: true,
    }
    const action = {
      type: SHOW_AUTH_MODAL,
      payload: data,
    }

    expect(authModalReducer(initialState, action))
  })
})
