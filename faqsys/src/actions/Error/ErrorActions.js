import {SET_ERROR_MESSAGE} from '../actionTypes'

export function setErrorMessage (error) {
  return {type: SET_ERROR_MESSAGE, error}
}
