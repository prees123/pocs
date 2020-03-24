import { getPayload } from 'react-oauth-openid'
import * as types from '../actions/actionTypes'
import { formatUserInfo } from '../services/userInfo'

let idPayload = getPayload('id_token') || undefined
const isAuthorized = !!idPayload

if (idPayload) {
  idPayload = formatUserInfo(idPayload)
}

export const initialState = {
  isAuthorized,
  ...idPayload,
}

export default function userReducer (state = initialState, action) {
  switch (action.type) {
    case types.SET_USER_INFO:
      return Object.assign({}, state, {
        isAuthorized: true,
        ...formatUserInfo(action.user),
      })
    case types.REMOVE_USER_INFO:
      return Object.assign({}, state, {
        email: undefined,
        firstName: undefined,
        fullName: undefined,
        isAuthorized: false,
        lanId: undefined,
        lastName: undefined,
        memberOf: undefined,
        accessToken: undefined,
      })
    default:
      return state
  }
}
