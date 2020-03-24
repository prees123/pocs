import {SET_CONTENT_BLOCK, SET_CONTENT_BLOCKS} from '../actions/actionTypes'
import update from 'immutability-helper'

const initialState = {
  contentBlock: {},
  contentBlocks: [],
}

export default function ContentBlockReducer (state = initialState, {type, contentBlock, contentBlocks}) {
  let result
  switch (type) {
    case SET_CONTENT_BLOCK:
    {
      result = update(state, {
        contentBlock: {
          $set: contentBlock,
        },
      })
      break
    }
    case SET_CONTENT_BLOCKS:
    {
      result = update(state, {
        contentBlocks: {
          $set: contentBlocks,
        },
      })
      break
    }
    default:
      return state
  }
  return result
}
