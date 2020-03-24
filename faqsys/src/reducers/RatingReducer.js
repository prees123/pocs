import {SET_UP, SET_DOWN, SET_COMMENT_SUBMITTED, SET_COMMENT, SET_CLICKED_BUTTON, SET_CLICKED} from '../actions/actionTypes'
import update from 'immutability-helper'

const initialState = {
  up: '',
  down: '',
  commentSubmitted: false,
  comment: '',
  clicked: false,
  clickedButton: 'none',
}

export default function RatingReducer (state = initialState, {type, up, down, commentSubmitted, comment, clicked, clickedButton}) {
  let result
  switch (type) {
    case SET_UP:
    {
      result = update(state, {
        up: {
          $set: up,
        },
      })
      break
    }
    case SET_DOWN:
    {
      result = update(state, {
        down: {
          $set: down,
        },
      })
      break
    }
    case SET_COMMENT_SUBMITTED:
    {
      result = update(state, {
        commentSubmitted: {
          $set: commentSubmitted,
        },
      })
      break
    }
    case SET_COMMENT:
    {
      result = update(state, {
        comment: {
          $set: comment,
        },
      })
      break
    }
    case SET_CLICKED_BUTTON:
    {
      result = update(state, {
        clickedButton: {
          $set: clickedButton,
        },
      })
      break
    }
    case SET_CLICKED:
    {
      result = update(state, {
        clicked: {
          $set: clicked,
        },
      })
      break
    }
    default:
      return state
  }
  return result
}
