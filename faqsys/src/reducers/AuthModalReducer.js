import {SHOW_AUTH_MODAL} from '../actions/actionTypes'
import update from 'immutability-helper'

const initialState = {
  isShown: false,
}

export default function authModalReducer (state = initialState, action) {
  let result
  switch (action.type) {
    case SHOW_AUTH_MODAL: {
      result = update(state, {isShown: {$set: action.isShown},
      })
      break
    }
    default:
      return state
  }
  return result
}
