import {SET_ERROR_MESSAGE} from '../../src/actions/actionTypes'
import {setErrorMessage} from '../../src/actions/Error/ErrorActions'

describe('error actions', () => {
  it('should create an action set the error message', () => {
    const data = "error message"
    const expectedAction = {
      type: SET_ERROR_MESSAGE,
      error: data
    }
    expect(setErrorMessage(data)).toEqual(expectedAction)
  })
})
