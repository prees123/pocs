import {
  REMOVE_USER_INFO,
  SET_USER_INFO,
} from '../actionTypes'

export function setUserInfo (user) {
  return {type: SET_USER_INFO, user}
}

export function removeUserInfo () {
  return {type: REMOVE_USER_INFO}
}
