import errorReducer, {initialState} from '../../src/reducers/ErrorReducer'
import {SET_ERROR_MESSAGE} from  '../../src/actions/actionTypes'

describe('errorReducer', () => {
  it('should handle SET_ERROR_MESSAGE', () => {
    const data = {
      type: 'Resource Not Found',
      level: '2',
      message: 'Resource was not found',
      code: '123',
    }
    const action = {
      type: SET_ERROR_MESSAGE,
      payload: data,
    }

    expect(errorReducer(initialState, action))
  })
})
