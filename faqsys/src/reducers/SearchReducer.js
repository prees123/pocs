import {
  SET_SEARCH_QUERY,
  SET_SEARCH_RESULTS,
  SET_SEARCH_PENDING,
  SET_SEARCH_ERROR,
  SET_SEARCH_SUCCESS,
  SET_SHOULD_EXECUTE_SEARCH_QUERY,
} from '../actions/actionTypes'
import update from 'immutability-helper'

const initialState = {
  searchQuery: '',
  searchResults: [],
  isSearchPending: false,
  isSearchSuccess: false,
  isSearchError: false,
  shouldExecuteSearchQuery: false,
}

export default function searchReducer (state = initialState, {type, shouldExecuteSearchQuery, searchQuery, searchResults, isSearchPending, isSearchSuccess, isSearchError}) {
  let result
  switch (type) {
    case SET_SEARCH_QUERY:
    {
      result = update(state, {
        searchQuery: {
          $set: searchQuery,
        },
      })
      break
    }
    case SET_SEARCH_RESULTS:
    {
      result = update(state, {
        searchResults: {
          $set: searchResults,
        },
      })
      break
    }
    case SET_SEARCH_PENDING:
    {
      result = update(state, {
        isSearchPending: {
          $set: isSearchPending,
        },
      })
      break
    }
    case SET_SEARCH_ERROR:
    {
      result = update(state, {
        isSearchError: {
          $set: isSearchError,
        },
      })
      break
    }
    case SET_SEARCH_SUCCESS:
    {
      result = update(state, {
        isSearchSuccess: {
          $set: isSearchSuccess,
        },
      })
      break
    }

    case SET_SHOULD_EXECUTE_SEARCH_QUERY:
    {
      result = update(state, {
        shouldExecuteSearchQuery: {
          $set: shouldExecuteSearchQuery,
        },
      })
      break
    }

    default:
      return state
  }
  return result
}
