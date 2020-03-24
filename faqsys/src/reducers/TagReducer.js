import {
  SET_GET_TAGS_ERROR,
  SET_GET_TAGS_PENDING,
  SET_GET_TAGS_SUCCESS,
  SET_TAGS,
  SET_CREATE_TAG_ERROR,
  SET_CREATE_TAG_PENDING,
  SET_CREATE_TAG_SUCCESS,
  APPEND_TAG,
} from '../actions/actionTypes'
import update from 'immutability-helper'

const initialState = {
  tags: [],
  isGetTagsPending: false,
  isGetTagsError: false,
  isGetTagsSuccess: false,
  isCreateTagSuccess: false,
  isCreateTagPending: false,
  isCreateTagError: false,
}

export default function TagReducer (state = initialState, {type, tags, isGetTagsError, isGetTagsPending, isGetTagsSuccess, isCreateTagError, isCreateTagPending, isCreateTagSuccess, newTag}) {
  let result
  switch (type) {
    case SET_TAGS:
    {
      result = update(state, {
        tags: {
          $set: tags,
        },
      })
      break
    }
    case SET_GET_TAGS_ERROR:
    {
      result = update(state, {
        isGetTagsError: {
          $set: isGetTagsError,
        },
      })
      break
    }
    case SET_GET_TAGS_SUCCESS:
    {
      result = update(state, {
        isGetTagsSuccess: {
          $set: isGetTagsSuccess,
        },
      })
      break
    }
    case SET_GET_TAGS_PENDING:
    {
      result = update(state, {
        isGetTagsPending: {
          $set: isGetTagsPending,
        },
      })
      break
    }
    case SET_CREATE_TAG_ERROR:
    {
      result = update(state, {
        isCreateTagError: {
          $set: isCreateTagError,
        },
      })
      break
    }
    case SET_CREATE_TAG_SUCCESS:
    {
      result = update(state, {
        isCreateTagSuccess: {
          $set: isCreateTagSuccess,
        },
      })
      break
    }
    case SET_CREATE_TAG_PENDING:
    {
      result = update(state, {
        isCreateTagPending: {
          $set: isCreateTagPending,
        },
      })
      break
    }
    case APPEND_TAG:
    {
      result = update(state, {
        tags: {
          $set: [...state.tags, newTag],
        },
      })
      break
    }
    default:
      return state
  }
  return result
}
