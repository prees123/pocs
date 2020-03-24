import {setUserInfo, removeUserInfo} from '../../src/actions/User/UserActions'

import {SET_USER_INFO, REMOVE_USER_INFO} from '../../src/actions/actionTypes'

describe('user actions', () => {
  it('should create an action to set the user info', () => {
    const data = "isAuthorized: true"
    const expectedAction = {
      type: SET_USER_INFO,
      user: "isAuthorized: true",
    }
    expect(setUserInfo(data)).toEqual(expectedAction)
  })

  it('should create an action to remove the user info', () => {
    const data = "isAuthorized: true"
    const expectedAction = {
      type: REMOVE_USER_INFO,
    }
    expect(removeUserInfo(data)).toEqual(expectedAction)
  })
})
