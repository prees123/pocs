import {
  SET_GET_ACCESS_LEVEL_PENDING,
  SET_GET_ACCESS_LEVEL_DATA,
  SET_GET_ACCESS_LEVEL_SUCCESS,
  SET_GET_ACCESS_LEVEL_ERROR,
} from '../actions/actionTypes'
import update from 'immutability-helper'

const initialState = {
  accessLevel: window.localStorage.getItem('accessLevel'),
  isGetAccessLevelPending: false,
  isGetAccessLevelError: false,
  isGetAccessLevelSuccess: false,
}

export default function authReducer (state = initialState, action) {
  let result
  switch (action.type) {
    case SET_GET_ACCESS_LEVEL_DATA: {
      result = update(state, {accessLevel: {$set: action.accessLevel},
      })
      break
    }
    case SET_GET_ACCESS_LEVEL_PENDING: {
      result = update(state, {isGetAccessLevelPending: {$set: action.isGetAccessLevelPending},
      })
      break
    }
    case SET_GET_ACCESS_LEVEL_SUCCESS: {
      result = update(state, {isGetAccessLevelSuccess: {$set: action.isGetAccessLevelSuccess},
      })
      break
    }
    case SET_GET_ACCESS_LEVEL_ERROR: {
      result = update(state, {isGetAccessLevelError: {$set: action.isGetAccessLevelError},
      })
      break
    }
    default:
      return state
  }
  return result
}
