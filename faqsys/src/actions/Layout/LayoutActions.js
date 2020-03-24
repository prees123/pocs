import {
  CLOSE_SIDE_NAV,
  OPEN_SIDE_NAV,
  SET_HEADER_TITLE,
  SHOW_AUTH_POPUP,
  SHOW_HEADER_PROGRESS,
} from '../actionTypes'

export function setHeaderTitle (headerTitle) {
  return {type: SET_HEADER_TITLE, headerTitle}
}

export function headerProgress (isShown) {
  return {type: SHOW_HEADER_PROGRESS, isShown}
}

export function showAuthPopup (popupType) {
  return {type: SHOW_AUTH_POPUP, popupType}
}

export function openSideNav () {
  return {type: OPEN_SIDE_NAV}
}

export function closeSideNav () {
  return {type: CLOSE_SIDE_NAV}
}
