import {
  SET_CLICKED,
  SET_CLICKED_BUTTON,
  SET_COMMENT,
  SET_COMMENT_SUBMITTED,
  SET_DOWN, SET_UP,
} from '../actionTypes'

export function setUp (up) {
  return {type: SET_UP, up}
}

export function setDown (down) {
  return {type: SET_DOWN, down}
}

export function setCommentSubmitted (commentSubmitted) {
  return {type: SET_COMMENT_SUBMITTED, commentSubmitted}
}

export function setComment (comment) {
  return {type: SET_COMMENT, comment}
}

export function setClickedButton (clickedButton) {
  return {type: SET_CLICKED_BUTTON, clickedButton}
}

export function setClicked (clicked) {
  return {type: SET_CLICKED, clicked}
}
