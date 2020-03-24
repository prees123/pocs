import {SHOW_AUTH_MODAL} from '../actionTypes'

export function showAuthModal (isShown) {
  return {type: SHOW_AUTH_MODAL, isShown}
}
