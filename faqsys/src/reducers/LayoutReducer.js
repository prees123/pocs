import {
  SHOW_HEADER_PROGRESS,
  SHOW_AUTH_POPUP,
  SET_HEADER_TITLE,
  CLOSE_SIDE_NAV,
  OPEN_SIDE_NAV,
} from '../actions/actionTypes'
import update from 'immutability-helper'

const initialState = {
  headerProgressIsShown: false,
  openPopup: 0,
  popupType: '',
  headerTitle: '',
  sideNavIsOpen: false,
}

export default function layoutReducer (state = initialState, action) {
  let result
  switch (action.type) {
    case SHOW_HEADER_PROGRESS:
    {
      result = update(state, {
        headerProgressIsShown: {
          $set: action.isShown,
        },
      })
      break
    }
    case SHOW_AUTH_POPUP:
    {
      result = update(state, {
        openPopup: {
          $set: state.openPopup + 1,
        },
        popupType: {
          $set: action.popupType,
        },
      })
      break
    }
    case SET_HEADER_TITLE:
    {
      result = update(state, {
        headerTitle: {
          $set: action.headerTitle,
        },
      })
      break
    }
    case CLOSE_SIDE_NAV:
    {
      result = update(state, {
        sideNavIsOpen: {
          $set: false,
        },
      })
      break
    }
    case OPEN_SIDE_NAV:
    {
      result = update(state, {
        sideNavIsOpen: {
          $set: true,
        },
      })
      break
    }
    default:
      return state
  }
  return result
}
