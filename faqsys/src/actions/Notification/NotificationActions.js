import {SHOW_NOTIFICATION} from '../actionTypes'

export function showNotification (isShown, message) {
  return {
    type: SHOW_NOTIFICATION,
    payload: {
      isShown,
      message,
    },
  }
}
