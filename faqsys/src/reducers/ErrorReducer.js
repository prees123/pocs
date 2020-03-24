import {SET_ERROR_MESSAGE} from '../actions/actionTypes'
import update from 'immutability-helper'

const initialState = {
  type: undefined,
  level: undefined,
  message: undefined,
  code: undefined,
}

export default function errorReducer (state = initialState, type, action) {
  let result = ''
  switch (type) {
    case SET_ERROR_MESSAGE: {
      result = update(state, {
        type: {$set: action.error.type},
        level: {$set: action.error.level},
        message: {$set: action.error.message},
        code: {$set: action.error.code},
      })
      break
    }
    default:
      return state
  }
  return result
}
